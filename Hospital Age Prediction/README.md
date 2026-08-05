##Overview

This project performs basic Exploratory Data Analysis (EDA) on a hospital patient dataset using Python.

The main objective is to analyse the ages of 500 patients, visualize their age distribution, and identify the most common age group.

---

## 🎯 Objectives

- Load and explore the healthcare dataset
- Select 500 patient records for age analysis
- Check for missing age values
- Calculate basic age statistics
- Visualize patient age distribution
- Divide patients into different age groups
- Identify the most common age group
- Visualize the number of patients in each age group

---

## 📁 Dataset

The project uses:

`healthcare_dataset.csv`

The dataset contains 600 patient records.

### Dataset Columns

- `Patient_ID` – Unique patient identifier
- `Age` – Age of the patient
- `Gender` – Gender of the patient
- `Blood_Type` – Patient blood type
- `Medical_Condition` – Medical condition of the patient
- `Admission_Type` – Type of hospital admission
- `Hospital` – Hospital name

For this analysis, the first 500 valid patient ages are selected.

---

## 🛠️ Technologies Used

- Python
- Pandas
- Matplotlib
- Google Colab / Jupyter Notebook

---

## 🔍 Analysis Performed

### 1. Dataset Loading

The healthcare CSV file is uploaded and loaded into a Pandas DataFrame.

### 2. Dataset Exploration

Basic dataset information is examined, including:

- Number of rows and columns
- Column names
- Data types
- First few records
- Missing values

### 3. Patient Age Selection

The first 500 valid patient ages are selected for analysis.

### 4. Basic Statistical Analysis

The following statistics are calculated:

- Average patient age
- Minimum age
- Maximum age
- Descriptive statistics

### 5. Age Distribution

A histogram is created to visualize the age distribution of 500 patients.

### 6. Age Group Creation

Patients are divided into the following age groups:

- 0–10
- 11–20
- 21–30
- 31–40
- 41–50
- 51–60
- 61–70
- 71–80
- 81–90
- 91–100

### 7. Most Common Age Group

The number of patients in each age group is calculated and the group containing the highest number of patients is identified.

### 8. Age Group Visualization

A bar chart is used to compare the number of patients across different age groups.

---

## 📊 Visualizations

The project includes:

- Histogram of patient age distribution
- Bar chart of patients by age group

---

## 📂 Project Structure

```text
Hospital-Patient-Age-Analysis/
│
├── Hospital_Patient_Age_Analysis.ipynb
├── healthcare_dataset.csv
└── README.md