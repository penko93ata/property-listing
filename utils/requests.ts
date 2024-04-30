const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }

    const response = await fetch(`${apiDomain}/properties`, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchProperty(id: string) {
  try {
    if (!apiDomain) {
      return null;
    }

    const response = await fetch(`${apiDomain}/properties/${id}`, { cache: "no-cache" });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
