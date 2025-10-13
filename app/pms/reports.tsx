import { Badge, BarHeader, Empty, Modal, Switch } from "@/components/ui";
import { useTheme } from "@/theme";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Reports() {
  const { palette } = useTheme();

  const [modal, setModal] = useState(false);
  const [switchValue, setSwitchValue] = useState(true);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    card: {
      backgroundColor: palette.background.secondary,
      padding: 20,
      borderRadius: 12,
      marginBottom: 15,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      marginBottom: 10,
    },
    cardDescription: {
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <BarHeader title="Project Management" variant="default" />
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project Reports</Text>
          <Text style={styles.cardDescription}>
            Generate comprehensive reports on project progress, resource
            utilization, and team performance.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Financial Reports</Text>
          <Text style={styles.cardDescription}>
            Track project budgets, expenses, and profitability across all your
            projects.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Time Reports</Text>
          <Text style={styles.cardDescription}>
            Monitor time spent on projects, track billable hours, and analyze
            productivity metrics.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Client Reports</Text>
          <Text style={styles.cardDescription}>
            Generate client-specific reports showing project status,
            deliverables, and milestones.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <Badge>Bage 1</Badge>
          <Badge variant="secondary">Bage 2</Badge>
          <Badge variant="success">Bage 3</Badge>
          <Badge variant="warning">Bage 4</Badge>
          <Badge variant="error">Bage 5</Badge>
          <Badge variant="neutral">Bage 6</Badge>
          <Badge size="small">Bage 7</Badge>
          <Badge size="large">Bage 8</Badge>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            variant="primary"
            size="medium"
          />
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            variant="secondary"
            size="medium"
          />
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            variant="success"
            size="medium"
          />
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            variant="warning"
            size="medium"
          />
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            variant="error"
            size="medium"
          />

          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            variant="success"
            size="small"
          />

          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            variant="warning"
            size="large"
          />
        </View>

        <View>
          <Empty
            title="No data found"
            subtitle="No data found"
            actionText="open modal"
            onActionPress={() => setModal(true)}
          >
            <Text style={styles.cardDescription}>Children goes here</Text>
          </Empty>
        </View>

        {/* <View>
          <Loading visible={true} text="Fetching items" />
        </View> */}

        <Modal
          title={"Modal View"}
          subtitle={"Add/Edit, Delete modal example"}
          visible={modal}
          onClose={() => setModal(false)}
          variant="default" // bottom, fullscreen, centered (default)
          animationType="fade" // fade, slide
        >
          <View>
            <Text style={styles.cardDescription}>Modal content</Text>
            <Text style={styles.cardDescription}>Modal content</Text>
            <Text style={styles.cardDescription}>Modal content</Text>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
