## Overview

This project demonstrates different feature engineering techniques used to prepare datasets for machine learning models.

## Features Used

The practice dataset contains features such as:

- Age
- Salary
- Gender
- City
- Date
- Purchase Amount
- Experience
- Rating

## Tasks Performed

### Missing Value Handling
- Numerical values filled using mean
- Categorical values filled using mode

### Feature Scaling
- Standardization applied to Salary
- Min-Max Scaling applied to Age

### Categorical Encoding
- Label Encoding applied to Gender
- One-Hot Encoding applied to City

### Feature Creation
Created:

Total_Spending = Salary + Purchase_Amount

### Date Feature Extraction
Extracted:

- Year
- Month
- Day
- Weekday

### Binning
Converted Age into:

- Young
- Adult
- Senior

### Outlier Detection
- Detected Salary outliers using the IQR method

### Feature Interaction
Created:

Experience_Salary = Experience × Salary

### Feature Selection
- Calculated correlations with Purchase Amount
- Identified less important features
- Created the final processed dataset

## Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn

## Learning Outcome

This project helped me understand how raw features can be transformed, scaled, encoded, combined, and selected to improve the quality of data provided to machine learning models.