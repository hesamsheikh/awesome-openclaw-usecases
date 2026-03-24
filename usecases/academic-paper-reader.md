# Academic Paper Plot Generator
Academic papers often contain valuable data in tables and figures, but extracting and re-visualizing this information is tedious. Manually recreating plots from dense PDFs or LaTeX sources is time-consuming and error-prone.

This use case turns OpenClaw into a plot extraction and generation assistant that reads academic papers, extracts underlying data from figures/tables, and generates new, customizable plots for further analysis or presentation.

## What It Does

- Reads the full paper (PDF or arXiv source) and detects all figures and tables
- Extracts data points from plots, charts, and tables using vision and OCR models
- Allows you to regenerate plots in your preferred style (e.g., Matplotlib, Plotly)
- Supports exporting extracted data as CSV or JSON for further analysis
- Enables side-by-side comparison of original and regenerated plots

## Pain Point
You need to quickly reuse or reinterpret data from published papers, but extracting it by hand is slow and error-prone. Automated plot generation saves time and ensures accuracy.

## Skills You Need
- [arxiv-reader](https://github.com/Prismer-AI/Prismer/tree/main/skills/arxiv-reader) (or equivalent paper-fetch skill)
- A vision-capable model integration in OpenClaw (for figure interpretation)
- Optional: a PDF parsing/OCR integration for non-arXiv papers
- Integration with a plotting library (e.g., Matplotlib, Plotly)

## How to Set It Up
1. Connect OpenClaw to your paper source (arXiv or uploaded PDFs) and ensure a vision-capable model is enabled.
2. Prompt OpenClaw:
```text
You are my academic plot extraction assistant.
For each paper I share:
1) Detect all figures and tables containing data.
2) Extract underlying data points from each plot or table.
3) Regenerate the plots using Matplotlib or Plotly.
4) Export the extracted data as CSV and JSON.
5) Provide a side-by-side comparison of the original and regenerated plots.
```
3. Try it with a concrete request:
```example
Extract all plots from this paper and regenerate them in Plotly.
Export the data for Figure 3 and Table 2 as CSV.
```
## Tips

- Ask for confidence scores on data extraction accuracy for each figure/table.
- Request editable plot code for further customization.
- For complex plots, ask OpenClaw to annotate any uncertainties or approximations in the extracted data.