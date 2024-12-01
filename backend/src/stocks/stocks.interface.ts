export interface HistoricalData {
    date: string;
    open: number;
}

export interface Stock {
    ticker: string;
    companyName: string;
    historicalData: HistoricalData[];
    participatesInTrading: boolean;
}
