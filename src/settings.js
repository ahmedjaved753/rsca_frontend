import { BASE } from "./helpers/routes";

export const storages = {
  LOCAL_FS: "localfs",
  DROPBOX: "dropbox"
};

// export const BACKEND_STATIC_STORAGE = (BASE === "https://rcsa-api-static-store-move.herokuapp.com/") ? storages.DROPBOX : storages.LOCAL_FS;
export const BACKEND_STATIC_STORAGE = storages.DROPBOX;
