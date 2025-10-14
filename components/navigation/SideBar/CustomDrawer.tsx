import { storageService } from "@/services/storage";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";
import { Feather } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getVisibleNavigationItems, NavigationItem } from "./navigationConfig";

interface DrawerItemProps {
  item: NavigationItem;
  level: number;
  activeRoute: string;
  onNavigate: (href: string, item: NavigationItem) => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  item,
  level,
  activeRoute,
  onNavigate,
}) => {
  const { palette } = useTheme();

  const isActive = activeRoute === item.href;
  const hasActiveChild =
    item.children && item.children.some((child) => activeRoute === child.href);
  const hasChildren = item.children && item.children.length > 0;

  const [isExpanded, setIsExpanded] = React.useState(hasActiveChild || false);

  React.useEffect(() => {
    if (hasActiveChild) {
      setIsExpanded(true);
    }
  }, [hasActiveChild]);

  const handlePress = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onNavigate(item.href, item);
    }
  };

  const itemStyles = StyleSheet.create({
    container: {
      marginLeft: level * spacing.md,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      marginVertical: 2,
      borderRadius: 8,
      backgroundColor:
        isActive || hasActiveChild
          ? `${palette.primary.main}15`
          : "transparent",
    },
    iconContainer: {
      width: 24,
      alignItems: "center",
      marginRight: spacing.sm,
    },
    textContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 16,
      color:
        isActive || hasActiveChild
          ? palette.primary.main
          : palette.text.primary,
      fontWeight: isActive || hasActiveChild ? "600" : "400",
    },
    badge: {
      backgroundColor: palette.error.main,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: spacing.xs,
    },
    badgeText: {
      color: palette.text.inverse,
      fontSize: 12,
      fontWeight: "bold",
    },
    expandIcon: {
      marginLeft: spacing.xs,
    },
  });

  return (
    <View style={itemStyles.container}>
      <TouchableOpacity
        style={itemStyles.item}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={itemStyles.iconContainer}>
          <Feather
            name={item.icon as any}
            size={20}
            color={
              isActive || hasActiveChild
                ? palette.primary.main
                : palette.text.secondary
            }
          />
        </View>
        <View style={itemStyles.textContainer}>
          <Text style={itemStyles.text}>{item.title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {item.badgeCount && item.badgeCount > 0 && (
              <View style={itemStyles.badge}>
                <Text style={itemStyles.badgeText}>{item.badgeCount}</Text>
              </View>
            )}
            {hasChildren && (
              <Feather
                name={isExpanded ? "chevron-down" : "chevron-right"}
                size={16}
                color={palette.text.tertiary}
                style={itemStyles.expandIcon}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {hasChildren && isExpanded && (
        <View>
          {item.children!.map((child, index) => (
            <DrawerItem
              key={`${child.href}-${index}`}
              item={child}
              level={level + 1}
              activeRoute={activeRoute}
              onNavigate={onNavigate}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const [localUser, setLocalUser] = React.useState<any>(null);

  useEffect(() => {
    (async () =>
      await storageService.getItem("user").then((stored) => {
        setLocalUser(JSON.parse(stored as string));
      }))();
  }, []);

  const activeRoute = pathname || "";

  const userRole = localUser?.allowedRoles?.[0] || "Superadmin";

  const visibleItems = getVisibleNavigationItems(userRole);

  const handleNavigate = (href: string, item: NavigationItem) => {
    router.push(href as any);
    props.navigation.closeDrawer();
  };

  const handleLogout = async () => {
    dispatch(logout());
    router.replace("/auth/login");

    await storageService.clear();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.surface.primary,
      paddingVertical: Platform.OS === "ios" ? spacing["md"] : 0,
    },
    header: {
      backgroundColor: palette.primary.main,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: palette.surface.secondary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.md,
    },
    avatarImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.inverse,
      marginBottom: 2,
    },
    userEmail: {
      fontSize: 14,
      color: palette.text.inverse,
      opacity: 0.8,
    },
    content: {
      flex: 1,
    },
    footer: {
      borderTopColor: palette.border.primary,
      padding: spacing.md,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      backgroundColor: palette.error.main,
    },
    logoutText: {
      fontSize: 16,
      color: palette.text.inverse,
      marginLeft: spacing.sm,
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.surface.primary }}>
      <View style={styles.container}>
        {/* Header with User Profile */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              {localUser?.imageUrl ? (
                <Image
                  source={{ uri: localUser.imageUrl }}
                  style={styles.avatarImage}
                />
              ) : (
                <Feather name="user" size={24} color={palette.text.inverse} />
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {localUser?.fullName || "User Name"}
              </Text>
              <Text style={styles.userEmail}>
                {localUser?.email || "user@example.com"}
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Items */}
        <DrawerContentScrollView
          {...props}
          style={styles.content}
          contentContainerStyle={{ paddingTop: 15 }}
          showsVerticalScrollIndicator={false}
        >
          {visibleItems.map((item, index) => (
            <DrawerItem
              key={`${item.href}-${index}`}
              item={item}
              level={0}
              activeRoute={activeRoute}
              onNavigate={handleNavigate}
            />
          ))}
        </DrawerContentScrollView>

        {/* Footer with Logout */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Feather name="log-out" size={20} color={palette.text.inverse} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
