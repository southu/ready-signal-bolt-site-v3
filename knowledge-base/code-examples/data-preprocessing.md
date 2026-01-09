# Data Preprocessing for Forecasting

## Overview

Proper data preprocessing is critical for accurate forecasting. This guide covers the most common preprocessing steps our team uses before fitting any forecasting model.

## Standard Preprocessing Pipeline

### 1. Load and Inspect Data

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def load_and_inspect(filepath):
    """Load time series data and perform basic inspection"""
    # Load data
    df = pd.read_csv(filepath, parse_dates=['date'])
    df.set_index('date', inplace=True)
    df.sort_index(inplace=True)

    # Basic info
    print(f"Data shape: {df.shape}")
    print(f"Date range: {df.index.min()} to {df.index.max()}")
    print(f"Frequency: {df.index.freq}")
    print(f"\nMissing values:\n{df.isnull().sum()}")
    print(f"\nBasic statistics:\n{df.describe()}")

    # Plot
    plt.figure(figsize=(12, 4))
    plt.plot(df.index, df['value'])
    plt.title('Raw Time Series')
    plt.xlabel('Date')
    plt.ylabel('Value')
    plt.show()

    return df

# Usage
df = load_and_inspect('sales_data.csv')
```

### 2. Handle Missing Values

```python
def handle_missing_values(df, method='interpolate'):
    """
    Handle missing values in time series data

    Methods:
    - 'interpolate': Linear interpolation
    - 'ffill': Forward fill
    - 'bfill': Backward fill
    - 'mean': Fill with mean
    - 'median': Fill with median
    """
    df_clean = df.copy()

    if method == 'interpolate':
        df_clean = df_clean.interpolate(method='linear')
    elif method == 'ffill':
        df_clean = df_clean.fillna(method='ffill')
    elif method == 'bfill':
        df_clean = df_clean.fillna(method='bfill')
    elif method == 'mean':
        df_clean = df_clean.fillna(df_clean.mean())
    elif method == 'median':
        df_clean = df_clean.fillna(df_clean.median())

    # Report
    missing_before = df.isnull().sum().sum()
    missing_after = df_clean.isnull().sum().sum()
    print(f"Missing values before: {missing_before}")
    print(f"Missing values after: {missing_after}")

    return df_clean

# Usage
df_clean = handle_missing_values(df, method='interpolate')
```

### 3. Detect and Handle Outliers

```python
def detect_outliers(df, column, method='iqr', threshold=1.5):
    """
    Detect outliers using IQR or Z-score method

    Args:
        df: DataFrame with time series
        column: Column name to check
        method: 'iqr' or 'zscore'
        threshold: IQR multiplier (1.5) or Z-score threshold (3)

    Returns:
        Boolean mask where True indicates outlier
    """
    data = df[column]

    if method == 'iqr':
        Q1 = data.quantile(0.25)
        Q3 = data.quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - threshold * IQR
        upper_bound = Q3 + threshold * IQR
        outliers = (data < lower_bound) | (data > upper_bound)

    elif method == 'zscore':
        z_scores = np.abs((data - data.mean()) / data.std())
        outliers = z_scores > threshold

    print(f"Detected {outliers.sum()} outliers ({outliers.sum()/len(data)*100:.2f}%)")

    return outliers

def handle_outliers(df, column, method='cap', detection_method='iqr'):
    """
    Handle detected outliers

    Methods:
    - 'cap': Cap at bounds (Winsorization)
    - 'remove': Remove outlier rows
    - 'interpolate': Replace with interpolated values
    - 'median': Replace with rolling median
    """
    df_clean = df.copy()
    outliers = detect_outliers(df, column, method=detection_method)

    if method == 'cap':
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        df_clean.loc[df_clean[column] < lower_bound, column] = lower_bound
        df_clean.loc[df_clean[column] > upper_bound, column] = upper_bound

    elif method == 'remove':
        df_clean = df_clean[~outliers]

    elif method == 'interpolate':
        df_clean.loc[outliers, column] = np.nan
        df_clean[column] = df_clean[column].interpolate()

    elif method == 'median':
        rolling_median = df_clean[column].rolling(window=7, center=True).median()
        df_clean.loc[outliers, column] = rolling_median[outliers]

    return df_clean

# Usage
df_clean = handle_outliers(df_clean, 'value', method='cap')
```

### 4. Check and Ensure Consistent Frequency

```python
def check_frequency(df):
    """Check if time series has consistent frequency"""
    if df.index.freq is None:
        # Try to infer frequency
        inferred_freq = pd.infer_freq(df.index)
        if inferred_freq:
            print(f"Inferred frequency: {inferred_freq}")
            df = df.asfreq(inferred_freq)
        else:
            print("⚠️  Could not infer frequency - irregular time series")
            # Find gaps
            time_diffs = df.index.to_series().diff()
            print(f"Time differences:\n{time_diffs.value_counts()}")
    else:
        print(f"Frequency: {df.index.freq}")

    return df

def resample_data(df, freq='D', agg_method='mean'):
    """
    Resample time series to desired frequency

    freq: 'D' (daily), 'W' (weekly), 'M' (monthly), 'Q' (quarterly)
    agg_method: 'mean', 'sum', 'first', 'last', 'median'
    """
    if agg_method == 'mean':
        df_resampled = df.resample(freq).mean()
    elif agg_method == 'sum':
        df_resampled = df.resample(freq).sum()
    elif agg_method == 'first':
        df_resampled = df.resample(freq).first()
    elif agg_method == 'last':
        df_resampled = df.resample(freq).last()
    elif agg_method == 'median':
        df_resampled = df.resample(freq).median()

    print(f"Resampled from {len(df)} to {len(df_resampled)} observations")

    return df_resampled

# Usage
df_clean = check_frequency(df_clean)
# If needed: df_clean = resample_data(df_clean, freq='D', agg_method='sum')
```

### 5. Transform Data

```python
def apply_transformation(df, column, method='log'):
    """
    Apply mathematical transformation to stabilize variance

    Methods:
    - 'log': Natural logarithm
    - 'sqrt': Square root
    - 'boxcox': Box-Cox transformation
    - 'diff': First difference
    """
    from scipy import stats

    df_transformed = df.copy()

    if method == 'log':
        # Ensure positive values
        if (df[column] <= 0).any():
            print("⚠️  Data contains non-positive values, adding offset")
            offset = abs(df[column].min()) + 1
            df_transformed[f'{column}_transformed'] = np.log(df[column] + offset)
        else:
            df_transformed[f'{column}_transformed'] = np.log(df[column])

    elif method == 'sqrt':
        df_transformed[f'{column}_transformed'] = np.sqrt(df[column])

    elif method == 'boxcox':
        transformed, lambda_param = stats.boxcox(df[column])
        df_transformed[f'{column}_transformed'] = transformed
        print(f"Box-Cox lambda: {lambda_param:.4f}")

    elif method == 'diff':
        df_transformed[f'{column}_transformed'] = df[column].diff()

    return df_transformed

def inverse_transform(values, method='log', params=None):
    """Inverse transformation for forecasts"""
    if method == 'log':
        offset = params.get('offset', 0) if params else 0
        return np.exp(values) - offset
    elif method == 'sqrt':
        return values ** 2
    elif method == 'boxcox':
        lambda_param = params['lambda']
        return stats.inv_boxcox(values, lambda_param)
    elif method == 'diff':
        # Need to add back the differenced values
        return values.cumsum() + params['initial_value']

# Usage
df_transformed = apply_transformation(df_clean, 'value', method='log')
```

### 6. Feature Engineering

```python
def create_time_features(df):
    """Create time-based features"""
    df_features = df.copy()

    # Date features
    df_features['year'] = df_features.index.year
    df_features['month'] = df_features.index.month
    df_features['quarter'] = df_features.index.quarter
    df_features['day_of_week'] = df_features.index.dayofweek
    df_features['day_of_month'] = df_features.index.day
    df_features['week_of_year'] = df_features.index.isocalendar().week

    # Cyclical encoding
    df_features['month_sin'] = np.sin(2 * np.pi * df_features['month'] / 12)
    df_features['month_cos'] = np.cos(2 * np.pi * df_features['month'] / 12)

    # Is weekend
    df_features['is_weekend'] = df_features['day_of_week'].isin([5, 6]).astype(int)

    return df_features

def create_lag_features(df, column, lags=[1, 7, 14, 30]):
    """Create lagged features"""
    df_lagged = df.copy()

    for lag in lags:
        df_lagged[f'{column}_lag_{lag}'] = df[column].shift(lag)

    # Rolling statistics
    for window in [7, 14, 30]:
        df_lagged[f'{column}_rolling_mean_{window}'] = df[column].rolling(window).mean()
        df_lagged[f'{column}_rolling_std_{window}'] = df[column].rolling(window).std()

    return df_lagged

# Usage
df_features = create_time_features(df_clean)
df_features = create_lag_features(df_features, 'value', lags=[1, 7, 30])
```

## Complete Preprocessing Pipeline

```python
class TimeSeriesPreprocessor:
    def __init__(self):
        self.transformation_method = None
        self.transformation_params = {}
        self.original_freq = None

    def preprocess(self, df, target_column='value'):
        """Complete preprocessing pipeline"""
        print("=== Starting Preprocessing Pipeline ===\n")

        # 1. Load and inspect
        print("1. Data inspection...")
        print(f"   Shape: {df.shape}")
        print(f"   Date range: {df.index.min()} to {df.index.max()}\n")

        # 2. Handle missing values
        print("2. Handling missing values...")
        df = handle_missing_values(df, method='interpolate')
        print()

        # 3. Handle outliers
        print("3. Detecting and handling outliers...")
        df = handle_outliers(df, target_column, method='cap')
        print()

        # 4. Check frequency
        print("4. Checking frequency...")
        df = check_frequency(df)
        self.original_freq = df.index.freq
        print()

        # 5. Apply transformation
        print("5. Applying transformation...")
        df = apply_transformation(df, target_column, method='log')
        self.transformation_method = 'log'
        print()

        print("=== Preprocessing Complete ===\n")
        return df

    def prepare_for_modeling(self, df, target_column='value_transformed'):
        """Prepare final dataset for modeling"""
        # Remove any remaining NaN values
        df_clean = df.dropna()

        # Split into features and target
        X = df_clean.drop(columns=[target_column])
        y = df_clean[target_column]

        return X, y

# Usage
preprocessor = TimeSeriesPreprocessor()
df_processed = preprocessor.preprocess(df)

# Now ready for modeling
from statsmodels.tsa.arima.model import ARIMA
model = ARIMA(df_processed['value_transformed'], order=(1, 1, 1))
results = model.fit()
```

## Best Practices

1. **Always keep original data** - Never overwrite your raw data
2. **Document transformations** - Keep track of what was applied and in what order
3. **Validate assumptions** - Check if your preprocessing actually helps
4. **Be consistent** - Apply the same preprocessing to train and test data
5. **Consider business context** - Don't remove outliers that are real events
6. **Use visualizations** - Plot before and after preprocessing
7. **Save preprocessing parameters** - You'll need them to transform forecasts back

## Common Mistakes to Avoid

❌ **Removing too many outliers** - You might be removing important signals
❌ **Forward-looking bias** - Don't use future information in preprocessing
❌ **Over-preprocessing** - Sometimes simpler is better
❌ **Inconsistent frequency** - Ensure all dates are present or properly handled
❌ **Not saving transformation parameters** - You need these to inverse-transform forecasts
❌ **Applying training statistics to test data** - This causes data leakage

## Checklist Before Modeling

- [ ] No missing values (or handled appropriately)
- [ ] Outliers detected and handled
- [ ] Consistent time frequency
- [ ] Transformation applied if needed (log, Box-Cox)
- [ ] Features created if using ML models
- [ ] Data split into train/test
- [ ] Preprocessing parameters saved
- [ ] Visualizations created and reviewed
