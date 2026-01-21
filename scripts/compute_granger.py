#!/usr/bin/env python3
"""
Granger Causality Computation Script

This script computes Granger causality tests for external features against Unit Sales.
Run once during development, commit the output JSON to the repo.

Usage:
    python scripts/compute_granger.py

Requirements:
    pip install pandas statsmodels

Output:
    src/components/ReadySignalInteractiveDemo/grangerResults.json
"""

import json
import os
from datetime import datetime
from pathlib import Path

import pandas as pd
from statsmodels.tsa.stattools import grangercausalitytests

# Configuration
MAX_LAG = 6
TARGET_COL = 'Unit Sales'
SIGNIFICANCE_LEVELS = {
    0.01: 'Strong predictive signal',
    0.05: 'Predictive signal',
    0.10: 'Directional / borderline',
    1.00: 'Weak evidence'
}

def get_interpretation(p_value):
    """Get human-readable interpretation based on p-value."""
    for threshold, label in SIGNIFICANCE_LEVELS.items():
        if p_value <= threshold:
            return label
    return 'Weak evidence'

def compute_granger_for_feature(df, target_col, feature_col, max_lag):
    """
    Compute Granger causality test for a single feature.
    Returns the best lag (lowest p-value) and corresponding p-value.
    """
    try:
        # Prepare data: target and feature columns only
        data = df[[target_col, feature_col]].dropna()
        
        if len(data) < max_lag + 10:
            print(f"  Skipping {feature_col}: insufficient data points")
            return None
        
        # Run Granger causality tests
        results = grangercausalitytests(data, maxlag=max_lag, verbose=False)
        
        # Find best lag (lowest p-value using F-test)
        best_lag = 1
        best_pvalue = 1.0
        
        for lag in range(1, max_lag + 1):
            # Get p-value from F-test
            f_test_result = results[lag][0]['ssr_ftest']
            p_value = f_test_result[1]
            
            if p_value < best_pvalue:
                best_pvalue = p_value
                best_lag = lag
        
        return {
            'feature': feature_col,
            'bestLag': best_lag,
            'pValue': round(best_pvalue, 4),
            'interpretation': get_interpretation(best_pvalue)
        }
        
    except Exception as e:
        print(f"  Error processing {feature_col}: {e}")
        return None

def main():
    # Paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    data_file = project_root / 'sampledata' / 'SportsDrinkSampleData_G_wext.csv'
    output_file = project_root / 'src' / 'components' / 'ReadySignalInteractiveDemo' / 'grangerResults.json'
    
    print(f"Loading data from: {data_file}")
    
    # Load data
    df = pd.read_csv(data_file)
    
    # Clean up: remove rows with missing values in target
    df = df.dropna(subset=[TARGET_COL])
    
    print(f"Loaded {len(df)} rows")
    
    # Identify external columns (exclude Date, target, and internal features)
    internal_cols = ['Date', 'Unit Sales', 'Price per Unit', 'Marketing Spend']
    external_cols = [col for col in df.columns if col not in internal_cols]
    
    print(f"\nExternal features to test: {external_cols}")
    print(f"Testing Granger causality with max lag = {MAX_LAG}\n")
    
    # Compute Granger for each external feature
    results = []
    for feature in external_cols:
        print(f"Testing: {feature}")
        result = compute_granger_for_feature(df, TARGET_COL, feature, MAX_LAG)
        if result:
            results.append(result)
            print(f"  Best lag: {result['bestLag']}, p-value: {result['pValue']}, {result['interpretation']}")
    
    # Sort by p-value (most significant first)
    results.sort(key=lambda x: x['pValue'])
    
    # Create output structure
    output = {
        'generatedAt': datetime.utcnow().isoformat() + 'Z',
        'target': TARGET_COL,
        'maxLag': MAX_LAG,
        'results': results
    }
    
    # Ensure output directory exists
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    # Write JSON
    with open(output_file, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"\n✅ Results written to: {output_file}")
    print(f"   Total features tested: {len(results)}")

if __name__ == '__main__':
    main()
