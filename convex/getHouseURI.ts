import { houseImgIds } from '../utils/constants';
import { query } from './_generated/server';

export default query(async ({ db, storage }, totalApartments: number) => {
    return await storage.getUrl(
        houseImgIds[totalApartments % houseImgIds.length]
    );
});
