export async function getId(): Promise<number> {
    return new Promise<number>((resolve) => {
        chrome.storage.local.get("user_id", (result) => {
            if (result.user_id) {
                resolve(result.user_id);
            } else {
                console.log("No user id found")
                resolve(1);
            }
        });
    });
}
