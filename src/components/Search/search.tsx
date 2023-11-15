import { useState } from "react";
import { SearchInitialStateTypes } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchMediaAsync, setIndexRedux } from "../../store/slices/searchSlice";
import { useNavigate } from "react-router-dom";
import { constants } from "../../assets/constants";
import styles from "./search.module.scss";

const searchInitialState: SearchInitialStateTypes = {
    search: "",
    yearStart: "",
    yearEnd: "",
};

const Search = () => {
    const dispatch = useAppDispatch();
    const { searchResult, error } = useAppSelector((state) => state.search);

    const navigate = useNavigate();
    const { paths } = constants;
    const [searchState, setSearchState] = useState(searchInitialState);

    const changeSearchState = (type: string, value: string) => {
        setSearchState({ ...searchState, [type]: value });
    };
    const getSearchResult = () => {
        searchState.search.length &&
            dispatch(searchMediaAsync({ search: searchState.search, yearStart: searchState.yearStart, yearEnd: searchState.yearEnd }));
        setSearchState(searchInitialState);
    };
    const goToShowPage = (index: number) => {
        navigate(paths.show);
        dispatch(setIndexRedux({ index }));
    };

    return (
        <div className={styles.search_wrapper}>
            <div className={styles.search_filter}>
                <input
                    type="text"
                    placeholder="Year start ..."
                    className={styles.search_filter_input}
                    value={searchState.yearStart}
                    onChange={(e) => changeSearchState("yearStart", e.target.value.replace(/(?:^0+|[^\d])/g, ""))}
                />
                <input
                    type="text"
                    placeholder="Year end ..."
                    className={styles.search_filter_input}
                    value={searchState.yearEnd}
                    onChange={(e) => changeSearchState("yearEnd", e.target.value.replace(/(?:^0+|[^\d])/g, ""))}
                />
            </div>
            <div className={styles.search_input_btn_wrapper}>
                <input
                    type="search"
                    className={styles.search_input}
                    placeholder="*Search here..."
                    value={searchState.search}
                    onChange={(e) => changeSearchState("search", e.target.value)}
                />
                <button className={styles.search_btn} onClick={getSearchResult}>
                    Search
                </button>
            </div>
            {searchResult.length ? (
                <div className={styles.found_items_wrapper}>
                    <div className={styles.found_items_header}>
                        <p>Thumbnail</p>
                        <p>Title</p>
                        <p>Location</p>
                        <p>Photographer</p>
                    </div>
                    <div className={styles.found_items}>
                        {searchResult.map(({ data, links }, index) => {
                            const src = links?.find((item) => item.href.endsWith(".jpg"));
                            return (
                                <div key={index} className={styles.found_item} onClick={() => goToShowPage(index)}>
                                    {src ? (
                                        <img src={src.href} alt="Image" className={styles.found_item_img} />
                                    ) : (
                                        <span>No preview available for this entry</span>
                                    )}
                                    <h2>{data[0].title}</h2>
                                    <p>{data[0].location}</p>
                                    <p>{data[0].photographer}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
            {error && <div className={styles.nothing_found}>{error}</div>}
        </div>
    );
};

export default Search;
