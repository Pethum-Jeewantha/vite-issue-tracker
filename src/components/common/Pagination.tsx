import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon,} from "@radix-ui/react-icons";
import {Button, Flex, Text} from "@radix-ui/themes";
import {useSearchParams} from "react-router-dom";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams, {replace: true});
    }

    return (
        <Flex align="center" gap="2">
            <Text size="2">
                Page {currentPage} of {pageCount}
            </Text>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => changePage(1)}
            >
                <DoubleArrowLeftIcon/>
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
            >
                <ChevronLeftIcon/>
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
            >
                <ChevronRightIcon/>
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => changePage(pageCount)}
            >
                <DoubleArrowRightIcon/>
            </Button>
        </Flex>
    );
};

export default Pagination;
