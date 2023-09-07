import { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";

function usePagination({
  onNewData,
  key,
  QUERY,
  querySkip,
  initialPageNo,
  variables = {},
}) {
  const [paginationObj, setPaginationObj] = useState({
    pageSize: 10,
    totalCount: 10,
    currentPage: initialPageNo ?? 0,
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: false,
      endCursor: null,
      startCursor: null,
    },
  });

  const {
    data: queryData,
    fetchMore,
    loading,
  } = useQuery(QUERY, {
    variables,
    skip: querySkip,
    fetchPolicy: "network-only",
  });

  const paginationRef = useRef();
  paginationRef.current = paginationObj;

  const handleChangePaginationObj = (data) => {
    setPaginationObj({ ...paginationRef.current, ...data });
  };

  const handleChangePage = async (pageNo) => {
    const { pageInfo, currentPage, pageSize } = paginationRef.current;
    const isAccesingPrevPage = pageNo < currentPage;
    let reqVariables = {};
    if (isAccesingPrevPage) {
      reqVariables = {
        first: null,
        last: pageSize,
        after: null,
        before: page === 0 ? null : pageInfo.startCursor,
      };
    } else {
      reqVariables = {
        first: pageSize,
        last: null,
        before: null,
        after: pageNo === 0 ? null : pageInfo.endCursor,
      };
    }
    const newData = await fetchMore({
      variables: { ...reqVariables, ...variables },
    });

    setPaginationObj({
      ...paginationRef.current,
      pageInfo: newData?.data?.[key]?.pageInfo,
      currentPage: pageNo,
    });
    const list = newData?.data?.[key]?.edges?.map((edge) => edge.node) ?? [];
    onNewData(list, pageNo);
  };

  const handleChangePageSize = (newPageSize) => {
    setPaginationObj({
      pageSize: newPageSize,
      currentPage: 0,
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        endCursor: null,
        startCursor: null,
      },
    });
    handleChangePage(0);
  };

  useEffect(() => {
    const list = queryData?.[key]?.edges?.map((edge) => edge.node) ?? [];
    const pageInfo = queryData?.[key]?.pageInfo;
    onNewData(list, paginationRef?.current?.currentPage);
    handleChangePaginationObj({
      pageInfo,
      totalCount: queryData?.[key]?.totalCount ?? 10,
    });
  }, [queryData, key]);

  return {
    loading,
    paginationObj,
    handleChangePage,
    handleChangePageSize,
    handleChangePaginationObj,
  };
}

export default usePagination;
