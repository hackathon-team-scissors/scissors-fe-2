export interface emission {
    categoryDetails: {
        iconCss: string;
    };
    calculation_description: string;
    expanded: boolean;
    co2_kg: number;
    title: string;
    id: string;
    insight: string;
    category: string;
}

export interface emissionDetails {
    ReceiptScan: {
        details: string;
        origin_co2_impact: number;
        updated_co2_impact: number;
    }
}