export const getUsersImages = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        cache: "no-store"
      });
      if (!res.ok) {
        throw new Error('Failed to fetch PhrasalVerbs');
      }
      return res.json();
    } catch (error) {
      console.log("Error fetching PhrasalVerbs", error);
    }
};