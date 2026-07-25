## Overview

This project performs Exploratory Data Analysis (EDA) and outlier detection on a Height and Weight dataset.

## Dataset

The dataset contains height and weight measurements of individuals.

## Tasks Performed

- Loaded the dataset using Pandas
- Explored Height and Weight features
- Plotted Height distribution using a histogram
- Plotted Weight distribution using a histogram
- Calculated Q1 and Q3
- Calculated Interquartile Range (IQR)
- Identified lower and upper outlier limits
- Detected Weight outliers
- Detected Height outliers
- Replaced outliers using mean and median
- Visualized distributions after outlier treatment

## Outlier Detection Method

The IQR method is used to identify values outside the normal range.

IQR = Q3 - Q1

Lower Limit = Q1 - 1.5 × IQR

Upper Limit = Q3 + 1.5 × IQR

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib

## Learning Outcome

This project helped me understand exploratory data analysis, data distributions, quartiles, IQR-based outlier detection, and techniques for handling outliers.