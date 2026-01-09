# ARIMA Models - Complete Guide

## What is ARIMA?

ARIMA (AutoRegressive Integrated Moving Average) is a statistical method for analyzing and forecasting time series data. It's one of the most widely used forecasting techniques for univariate time series.

### Components

ARIMA combines three key components:

1. **AR (AutoRegressive)**: Uses past values to predict future values
   - The "p" parameter determines how many past values to use
   - Example: If p=2, we use the last 2 data points

2. **I (Integrated)**: Makes the data stationary through differencing
   - The "d" parameter is the number of differences needed
   - Most time series need d=1 or d=2

3. **MA (Moving Average)**: Uses past forecast errors
   - The "q" parameter determines how many past errors to use
   - Helps smooth out noise in predictions

## When to Use ARIMA

### Best Use Cases

Use ARIMA when:
- You have **50-100+ historical data points**
- Data shows **trend and/or seasonality**
- You need **interpretable model parameters**
- The relationship is primarily **linear**
- You want a **statistical approach** with confidence intervals

### When NOT to Use ARIMA

Avoid ARIMA when:
- You have **external predictor variables** (use ARIMAX, SARIMAX, or ML models)
- Relationships are **highly non-linear** (consider Prophet or ML models)
- You have **less than 50 data points** (too little data for reliable estimation)
- You need to incorporate **business rules or constraints**
- Data has **multiple seasonal patterns** (use TBATS or ML models)

## Model Selection Process

### Step 1: Check for Stationarity

```python
from statsmodels.tsa.stattools import adfuller

def check_stationarity(data):
    result = adfuller(data)
    print(f'ADF Statistic: {result[0]}')
    print(f'p-value: {result[1]}')

    if result[1] <= 0.05:
        print('Data is stationary')
        return True
    else:
        print('Data is NOT stationary - needs differencing')
        return False
```

### Step 2: Determine Parameters

**Using ACF and PACF plots:**
- ACF (Autocorrelation Function) → helps determine q
- PACF (Partial Autocorrelation Function) → helps determine p

```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
plot_acf(data, lags=20, ax=axes[0])
plot_pacf(data, lags=20, ax=axes[1])
plt.show()
```

**Or use auto_arima for automatic selection:**

```python
from pmdarima import auto_arima

model = auto_arima(data,
                   start_p=0, start_q=0,
                   max_p=5, max_q=5,
                   seasonal=False,
                   stepwise=True,
                   suppress_warnings=True,
                   error_action='ignore')

print(f'Best model: ARIMA{model.order}')
```

### Step 3: Fit and Validate

```python
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error, mean_absolute_error
import numpy as np

# Split data
train_size = int(len(data) * 0.8)
train, test = data[:train_size], data[train_size:]

# Fit model
model = ARIMA(train, order=(1, 1, 1))
fitted_model = model.fit()

# Forecast
forecast = fitted_model.forecast(steps=len(test))

# Calculate metrics
mse = mean_squared_error(test, forecast)
mae = mean_absolute_error(test, forecast)
rmse = np.sqrt(mse)

print(f'RMSE: {rmse:.2f}')
print(f'MAE: {mae:.2f}')

# Check if forecast is within acceptable range
acceptable_error = 0.15  # 15% error threshold
mape = np.mean(np.abs((test - forecast) / test)) * 100
if mape < acceptable_error * 100:
    print(f'✅ Model performance acceptable: MAPE = {mape:.2f}%')
else:
    print(f'❌ Model needs improvement: MAPE = {mape:.2f}%')
```

## Production Implementation

### Complete Pipeline

```python
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

class ARIMAForecaster:
    def __init__(self, order=(1, 1, 1)):
        self.order = order
        self.model = None
        self.fitted_model = None

    def fit(self, data):
        """Fit ARIMA model to training data"""
        self.model = ARIMA(data, order=self.order)
        self.fitted_model = self.model.fit()
        return self

    def forecast(self, steps=12):
        """Generate forecast for specified number of steps"""
        if self.fitted_model is None:
            raise ValueError("Model must be fitted before forecasting")

        forecast = self.fitted_model.forecast(steps=steps)
        conf_int = self.fitted_model.get_forecast(steps=steps).conf_int()

        return {
            'forecast': forecast,
            'lower_bound': conf_int.iloc[:, 0],
            'upper_bound': conf_int.iloc[:, 1]
        }

    def get_diagnostics(self):
        """Return model diagnostics"""
        if self.fitted_model is None:
            raise ValueError("Model must be fitted first")

        return {
            'aic': self.fitted_model.aic,
            'bic': self.fitted_model.bic,
            'params': self.fitted_model.params
        }

# Usage example
data = pd.read_csv('sales_data.csv', index_col='date', parse_dates=True)
sales = data['sales']

forecaster = ARIMAForecaster(order=(1, 1, 1))
forecaster.fit(sales)

# Get 12-month forecast
results = forecaster.forecast(steps=12)
print(f"Next month forecast: {results['forecast'][0]:.2f}")
print(f"Confidence interval: [{results['lower_bound'][0]:.2f}, {results['upper_bound'][0]:.2f}]")
```

## Seasonal ARIMA (SARIMA)

For data with seasonal patterns, use SARIMA:

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

# SARIMA(p,d,q)(P,D,Q,s)
# s = seasonal period (12 for monthly data with yearly seasonality)
model = SARIMAX(data,
                order=(1, 1, 1),           # (p, d, q)
                seasonal_order=(1, 1, 1, 12))  # (P, D, Q, s)

fitted_model = model.fit()
forecast = fitted_model.forecast(steps=12)
```

## Common Issues and Solutions

### Issue 1: Model Won't Converge

**Symptoms:** Fit fails with convergence error

**Solutions:**
1. Try different starting parameters
2. Simplify the model (reduce p, q values)
3. Check for outliers and remove them
4. Ensure data is properly scaled
5. Increase max iterations

```python
model = ARIMA(data, order=(1, 1, 1))
fitted_model = model.fit(method='css-mle', maxiter=1000)
```

### Issue 2: Poor Forecast Accuracy

**Symptoms:** High MAPE, large forecast errors

**Solutions:**
1. Add seasonal components (use SARIMA)
2. Consider external variables (use ARIMAX)
3. Check if data is stationary
4. Try different order parameters
5. Validate with proper train/test split

### Issue 3: Forecasts Are Flat

**Symptoms:** Forecast converges to a constant value

**Causes:**
- Data might not have predictable patterns
- Model order might be wrong
- Data might need transformation

**Solutions:**
1. Try log transformation for exponential trends
2. Add seasonal components
3. Consider if data is truly predictable

## Model Comparison

When choosing between ARIMA and alternatives:

| Scenario | Recommendation |
|----------|---------------|
| Simple trend + seasonality | ARIMA/SARIMA |
| Multiple seasonalities | TBATS or Prophet |
| External variables needed | ARIMAX or ML models |
| Very short history (<50 points) | Exponential Smoothing |
| Non-linear patterns | Prophet or ML models |
| Need interpretability | ARIMA |
| Need high accuracy | Try multiple, compare |

## Best Practices

1. **Always validate with holdout data** - Don't use the full dataset for training
2. **Use AIC/BIC for model selection** - Lower is better
3. **Check residuals** - Should be white noise
4. **Consider business context** - Statistical significance ≠ business significance
5. **Document your assumptions** - What made you choose these parameters?
6. **Monitor performance** - Re-fit model periodically with new data
7. **Provide confidence intervals** - Don't just give point forecasts

## Key Takeaways

- ARIMA is best for stationary or trend-stationary data
- Requires 50-100+ data points for reliable estimates
- Parameters (p,d,q) should be chosen carefully using ACF/PACF or auto_arima
- Always validate with holdout data
- Consider SARIMA for seasonal data
- Use ARIMAX when external variables matter
- Monitor and update models regularly

## Further Reading

- Box, G. E., Jenkins, G. M., & Reinsel, G. C. (2015). Time Series Analysis: Forecasting and Control
- Hyndman, R. J., & Athanasopoulos, G. (2021). Forecasting: Principles and Practice
- Statsmodels documentation: https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html
