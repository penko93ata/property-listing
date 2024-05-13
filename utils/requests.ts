const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }

    // TODO - Is { cache: "no-cache" } still needed to disable cache
    const response = await fetch(`${apiDomain}/properties`);

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

    // TODO - Is { cache: "no-cache" } still needed to disable cache
    const response = await fetch(`${apiDomain}/properties/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
