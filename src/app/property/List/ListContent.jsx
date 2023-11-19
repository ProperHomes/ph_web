"use client";
import { useState, memo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";

const Card = dynamic(() => import("../Card/index"));
const ListSkeleton = dynamic(() => import("../../../components/ListSkeleton"), {
  ssr: false,
});
const CreatePropertySaleRentLease = dynamic(
  () => import("../../list-your-property-for-sale-rent-lease"),
  { ssr: false }
);

const Section = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "1.2rem",
  rowGap: "2em",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
  },
  width: "100%",
}));

function PropertyList({
  data,
  handleLoadNext,
  infiniteScroll,
  isSearch,
  onCloseEditor,
  showSkeleton,
  showFavorite,
  listToShow,
}) {
  const [propertyIdToEdit, setPropertyIdToEdit] = useState(null);

  const toggleEditor = (id) => () => {
    setPropertyIdToEdit(id);
    if (onCloseEditor) {
      onCloseEditor();
    }
  };

  const propertyToEdit = listToShow.find((l) => l.id === propertyIdToEdit);

  const hasMore = paginationObj.pageInfo?.hasNextPage;

  return (
    <Stack>
      {showSkeleton && <ListSkeleton n={10} />}

      {!infiniteScroll && !isSearch && !propertyIdToEdit && !showSkeleton && (
        <Section>
          {data.map((l, i) => {
            return (
              <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                <Card
                  data={l}
                  showFavorite={showFavorite}
                  isPriority={i < 9}
                  isFullWidth={listToShow.length > 3}
                  togglePropertyEditor={toggleEditor(l.id)}
                />
              </Box>
            );
          })}
        </Section>
      )}

      {infiniteScroll && !propertyIdToEdit && !showSkeleton && (
        <InfiniteScroll
          dataLength={listToShow.length}
          next={handleLoadNext}
          hasMore={hasMore}
          endMessage={<></>}
          loader={<></>}
        >
          <Section>
            {listToShow.map((l, i) => {
              return (
                <Box key={i} sx={{ justifySelf: "center", width: "100%" }}>
                  <Card
                    data={l}
                    showFavorite={showFavorite}
                    isPriority={i < 9}
                    isFullWidth={listToShow.length > 3}
                    togglePropertyEditor={toggleEditor(l.id)}
                  />
                </Box>
              );
            })}
          </Section>
        </InfiniteScroll>
      )}

      {!!propertyIdToEdit && (
        <CreatePropertySaleRentLease
          data={propertyToEdit}
          handleCancel={toggleEditor()}
        />
      )}
    </Stack>
  );
}

export default memo(PropertyList);
