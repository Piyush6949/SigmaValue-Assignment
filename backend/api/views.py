from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import pandas as pd
import os

# Load dataset once
DATA_PATH = settings.EXCEL_FILE_PATH
df = pd.read_excel(DATA_PATH)

@api_view(["GET"])
def analyze_area(request):
    try:
        area = request.GET.get("area")
        if not area:
            return Response({"error": "area parameter is required"}, status=400)

        # Filter area
        filtered = df[df["final location"].str.lower() == area.lower()]

        if filtered.empty:
            return Response({"error": "Area not found in dataset"}, status=404)

        # Price trend using available column
        price_trend = filtered.groupby("year")["total_sales - igr"].sum().reset_index()

        # Demand trend
        demand_trend = filtered.groupby("year")["total sold - igr"].sum().reset_index()

        # Summary (mock)
        summary = f"{area} has {len(filtered)} data records. Prices and demand trending extracted successfully."

        return Response({
            "summary": summary,
            "price_trend": price_trend.to_dict(orient="records"),
            "demand_trend": demand_trend.to_dict(orient="records"),
            "table": filtered.to_dict(orient="records")
        })

    except Exception as e:
        return Response({"error": str(e)})
