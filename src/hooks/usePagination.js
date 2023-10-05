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
    refetch,
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

  const handleLoadNext = async (pageNo) => {
    const { pageInfo, pageSize } = paginationRef.current;
    const reqVariables = {
      first: pageSize,
      last: null,
      before: null,
      after: pageNo === 0 ? null : pageInfo.endCursor,
    };
    const newData = await fetchMore({
      variables: { ...reqVariables, ...variables },
    });
    setPaginationObj({
      ...paginationRef.current,
      pageInfo: newData?.data?.[key]?.pageInfo,
    });
    const list = newData?.data?.[key]?.edges?.map((edge) => edge.node) ?? [];
    onNewData(list, true);
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
    handleLoadNext(0);
  };

  useEffect(() => {
    const list = queryData?.[key]?.edges?.map((edge) => edge.node) ?? [];
    const pageInfo = queryData?.[key]?.pageInfo;
    onNewData(list, paginationRef?.current?.currentPage);
    handleChangePaginationObj({
      pageInfo,
      totalCount: queryData?.[key]?.totalCount ?? 10,
    });
    return () => {
      paginationRef.current = null;
    };
  }, [queryData, key]);

  return {
    loading,
    paginationObj,
    refetch,
    handleLoadNext,
    handleChangePageSize,
    handleChangePaginationObj,
  };
}

export default usePagination;
