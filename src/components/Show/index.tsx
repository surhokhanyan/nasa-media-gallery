import { useEffect } from "react";
import { Link } from "react-router-dom";
import { constants } from "../../assets/constants";
import { resetImagesRedux, searchImagesAsync } from "../../store/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./show.module.scss";

const Show = () => {
    const dispatch = useAppDispatch();
    const { searchResult, images, findIndex } = useAppSelector((state) => state.search);
    const { paths } = constants;
    const neededImage = images.find((item) => item.includes("medium"));
    const neededItem = searchResult[findIndex]?.data[0];

    useEffect(() => {
        searchResult.length && dispatch(searchImagesAsync({ href: searchResult[findIndex].href }));
        return () => {
            dispatch(resetImagesRedux());
        };
    }, []);
    return (
        <div className={styles.show_wrapper}>
            <Link to={paths.search} className={styles.back_btn}>
                Back to search page
            </Link>
            {searchResult.length ? (
                <div className={styles.info_wrapper}>
                    {neededImage && <img src={neededImage} alt="Image" className={styles.image} />}
                    <div className={styles.info}>
                        <p>Title : </p>
                        <p>{neededItem.title}</p>
                    </div>
                    {neededItem.location && (
                        <div className={styles.info}>
                            <p>Location : </p>
                            <p>{neededItem.location}</p>
                        </div>
                    )}
                    {neededItem.photographer && (
                        <div className={styles.info}>
                            <p>Photographer : </p>
                            <p>{neededItem.photographer}</p>
                        </div>
                    )}
                    {}
                    <div className={styles.info}>
                        <p>Description : </p>
                        <p>{neededItem.description}</p>
                    </div>
                    {neededItem.keywords && (
                        <div className={styles.info}>
                            <p>Keywords : </p>
                            <p>{neededItem.keywords.join(", ")}</p>
                        </div>
                    )}
                    <div className={styles.info}>
                        <p>Date : </p>
                        <p>{neededItem.date_created.split("T")[0]}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.nothing_found}>Sorry. Nothing found! Please go back to search page and search what you need</div>
            )}
        </div>
    );
};

export default Show;
