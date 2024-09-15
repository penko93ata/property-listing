const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties({ searchParams: { page = 1, pageSize = 9 } }: { searchParams: { page: number; pageSize: number } }) {
  try {
    if (!apiDomain) {
      return [];
    }

    const queryParams = new URLSearchParams({ page: page.toString(), pageSize: pageSize.toString() });
    const response = await fetch(`${apiDomain}/properties?${queryParams}`, { cache: "no-cache" });

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
