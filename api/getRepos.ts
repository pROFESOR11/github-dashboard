import { SearchResponse } from "./types";

const API_BASE_URL = "https://api.github.com";

export async function getRepos(
  _key: string,
  queryStr: string,
  page?: number
): Promise<SearchResponse> {
  return fetch(
    `${API_BASE_URL}/search/repositories?q=${queryStr}&sort=stars&order=desc&page=${
      page || 1
    }&per_page=41`
  )
    .then((response) => response.json())
    .then((resj) =>
      // fetch n+1 items, return n items, then inform client whether there is more to fetch via hasMore key
      Object.assign(
        {},
        {
          ...resj,
          items: resj.items.slice(0, 40),
        },
        {
          hasMore: resj.items.length === 41,
        }
      )
    )
    .catch((err) => {
      console.log("err", err);
      throw new Error("Limit reached!");
    });
}
