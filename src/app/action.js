"use server"

export const fetchBlog = async () => {
    try {
        const response = await fetch('', {
            cache: "force-cache"
        });
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err)
    }

}