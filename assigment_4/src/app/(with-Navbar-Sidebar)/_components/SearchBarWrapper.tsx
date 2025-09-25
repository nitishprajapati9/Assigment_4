import { useSearch } from "@/app/Providers/SearchProvider";
import SearchBar from "./SearchBar";

export default function SearchBarWrapper(){
    const {searchText,setSearchText,setSortedIcon,isSorted} = useSearch()
    return (
        <SearchBar searchText={searchText} setSearchText={setSearchText} isSorted={isSorted} setSortedIcon={setSortedIcon} />
    )
}