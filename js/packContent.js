const dir = '/packsData';

export async function fetchPacks() {
    const packsResult = await fetch(`${dir}/_packs.json`);
    try {
        const packs = await packsResult.json();
        return await Promise.all(
            packs.map(async (path, rank) => {
                const packsResult = await fetch(`${dir}/${path}.json`);
                try {
                    const pack = await packsResult.json();
                    return [
                        {
                            ...pack,
                            path,
                            records: pack.records.sort(
                                (a, b) => b.percent - a.percent,
                            ),
                        },
                        null,
                    ];
                } catch {
                    console.error(`Failed to load level #${rank + 1} ${path}.`);
                    return [null, path];
                }
            }),
        );
    } catch {
        console.error(`Failed to load packs.`);
        return null;
    }
}

export async function fetchEditors() {
    try {
        const editorsResults = await fetch(`${dir}/_editors.json`);
        const editors = await editorsResults.json();
        return editors;
    } catch {
        return null;
    }
}
