export type CalendarData = {
    timezone: string;
    dates: CalendarDay[];
};

export type CalendarDay = {
    date: string;
    total_cal: number;
    total_cal_burned: number;
    total_proteins: number;
    total_carbs: number;
    total_fat: number;
    total_sodium: number;
    water_consumed_liter: number | null;
    avg_weight_kg: number | null;
    daily_kcal_limit: number;
    daily_carbs_pct: number | null;
    daily_fat_pct: number;
    daily_protein_pct: number;
    foods_logged: number;
    exercises_logged: number | null;
    weights_logged: number | null;
    notes: string | null;
};
