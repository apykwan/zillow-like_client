// Add comma to the number
export function formatNumber(price) {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}