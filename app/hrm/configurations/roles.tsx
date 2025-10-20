import RolesCard from "@/components/modules/hrm/rolesCard";
import {
  BarHeader,
  Loading,
  ResponsiveFlatList,
  SearchComponent,
} from "@/components/ui";
import {
  useGetAllSystemModulePagesQuery,
  useGetRoleListingQuery,
} from "@/store/api/modules/hrm/hrmRoles";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Roles() {
  const { palette } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: rolesData,
    isLoading: rolesLoading,
    refetch: refetchRoles,
  } = useGetRoleListingQuery({
    pageNumber,
    pageSize: 10,
    sortOrder: false,
    ...(searchQuery ? { sortBy: searchQuery } : {}),
  });
  const { data: modulesData, isLoading: modulesLoading } =
    useGetAllSystemModulePagesQuery();

  const modulePageLookup = useMemo(() => {
    const map: Record<
      number,
      { id: number; name: string; shortURL: string; icon: string }
    > = {};
    if (modulesData && Array.isArray(modulesData)) {
      modulesData.forEach((group) => {
        group.modulePages.forEach((p) => {
          map[p.id] = p;
        });
      });
    }
    return map;
  }, [modulesData]);

  const handleRefresh = async () => {
    await refetchRoles();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleAddRole = () => {
    console.log("Add Role clicked");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    headerSection: {
      marginBottom: 20,
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 16,
    },
    searchContainer: {
      flex: 1,
    },
    addButton: {
      backgroundColor: palette.primary.main,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    addButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    list: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Roles" variant="default" />

      <Loading
        visible={modulesLoading || rolesLoading}
        text="Fetching roles data"
      />

      <View style={{ paddingTop: 12 }}>
        <View style={styles.headerSection}>
          <View style={styles.searchContainer}>
            <SearchComponent
              placeholder="Search roles..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddRole}>
            <Ionicons name="add" size={20} color={palette.text.inverse} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {!!rolesData && (
        <ResponsiveFlatList
          contentContainerStyle={styles.list}
          data={rolesData.items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <RolesCard
              role={item}
              modulePageLookup={modulePageLookup}
              onEdit={(r) => console.log("edit", r)}
              onDelete={(r) => console.log("delete", r)}
            />
          )}
          // @ts-ignore: refreshControl prop allowed by parent screens
          onRefresh={handleRefresh}
          refreshing={rolesLoading}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
