import { apartmentImgIds } from './../common/constants';
import { query } from './_generated/server';

export default query(async ({ db, storage }, totalApartments: number) => {
    return await storage.getUrl(
        apartmentImgIds[totalApartments % apartmentImgIds.length]
    );
});
