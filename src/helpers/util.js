// Add comma to the number
export function formatNumber(price) {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function trimAddress(string) {
    if(string.length > 35) return `${string.substring(0, 35)}...`;
    return string;
}

export function formatPhoneNumber(phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
}