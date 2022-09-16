import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { useBearStore } from '../../stores/cartStore';
import { respondTo, lg, useRespondTo } from '../../utils/responsive';

import { Container } from '../../components/layouts';
import ProductItem from '../../components/ProductsLayout/ProductItem';
import RightSideNotifications from '../../components/RightSideNotifications';
import Title from '../../components/Title';
import Paginator from '../../components/Paginator';

const PC_PAGE_SIZE = 20;
const MOBILE_PAGE_SIZE = 5;

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const allItems = Object.entries(useBearStore(state => state.products)).map((item) => item[1]);
    const currentPage = searchParams.get('page') || null;
    const isMobile = useRespondTo(lg);

    const displayItems = useMemo(() => {
        let pageSize = isMobile ? MOBILE_PAGE_SIZE : PC_PAGE_SIZE;
        let currentPageNum = parseInt(currentPage);

        return allItems.slice((currentPageNum - 1) * pageSize, (currentPageNum - 1) * pageSize + pageSize);
    }, [isMobile, currentPage, allItems]);

    const totalPage = useMemo(() => {
        let pageSize = isMobile ? MOBILE_PAGE_SIZE : PC_PAGE_SIZE;

        return Math.ceil(allItems.length / pageSize);
    }, [isMobile, allItems])


    const setPage = (page) => setSearchParams({ page: page });

    useEffect(() => {
        if (!currentPage) {
            setPage(1);
        } else {
            setPage(currentPage)
        }
    }, [currentPage]); // eslint-disable-line

    useEffect(() => {
        if (parseInt(currentPage) > totalPage) {
            setPage(1);
        }
    }, [currentPage, isMobile]); // eslint-disable-line

    const handlePageClick = (page) => setPage(page);

    return (
        <StyledProducts>
            <RightSideNotifications moreMarginTop />
            <Title>View All</Title>
            <List>
                {
                    displayItems.map((item, id) => <ProductItem item={item} key={id} />)
                }
            </List>
            {totalPage > 1 && <Paginator currentPage={parseInt(currentPage)} lastPage={totalPage} onPageClick={handlePageClick} />
            }
        </StyledProducts>
    )
}

const StyledProducts = styled.div`
    padding-top: 100px;
    padding-bottom: 160px;

    ${ respondTo.md } {
        padding-top: 40px;
        padding-bottom: 120px;
    }
`

const List = styled(Container).attrs({ as: 'ul' })`
    --grid-columns: 4;
    margin-top: 64px;
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: 80px 28px;

    ${respondTo.lg} {
        --grid-columns: 2;
    }

    ${ respondTo.md } {
        margin-top: 32px;
    }

    ${respondTo.sm} {
        --grid-columns: 1;
        gap: 40px;
    }
`

export default Products