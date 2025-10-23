const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSubsidy = async (manufacturer, modelGroup) => {
  const encodedManufacturer = encodeURIComponent(manufacturer);
  const encodedModelGroup = encodeURIComponent(modelGroup);
  
  const response = await fetch(`${API_BASE_URL}/subsidy?manufacturer=${encodedManufacturer}&model_group=${encodedModelGroup}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      'Accept': 'application/json'
    }
  });
  
  return await response.json();
};