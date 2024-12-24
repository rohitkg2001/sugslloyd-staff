import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { styles, spacing, typography, SCREEN_WIDTH } from "../styles";
import { H2, H6, P } from "../components/text";

const TaskInventoryScreen = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Solar Pump",
      count: 0,
    },
  ]);

  const increment = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={[spacing.pv3, { width: SCREEN_WIDTH - 16, marginLeft: 8 }]}>
      <H6 style={[typography.font20, spacing.p2, { color: "black" }]}>
        Add Items
      </H6>

      {items.map((item) => (
        <View key={item.id}>
          <View style={[styles.row, spacing.pv4, spacing.mb2]}>
            <P style={[typography.font20, spacing.p2]}>{item.name}</P>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => decrement(item.id)}
                style={[
                  spacing.br2,
                  styles.bgPrimary,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    height: 40,
                  },
                ]}
              >
                <P style={{ color: "#fff", fontSize: 20 }}>-</P>
              </TouchableOpacity>
              <H6 style={[typography.font20, spacing.p2]}>{item.count}</H6>
              <TouchableOpacity
                onPress={() => increment(item.id)}
                style={[
                  spacing.br2,
                  styles.bgPrimary,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    height: 40,
                  },
                ]}
              >
                <P style={{ color: "#fff", fontSize: 20 }}>+</P>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.row,
              spacing.p1,
              spacing.br2,
              spacing.mb3,
              { alignItems: "center", backgroundColor: "#ccc", top: 410 },
            ]}
          >
            <TouchableOpacity
              onPress={() => deleteItem(item.id)}
              style={[spacing.br3, spacing.p2, styles.bgPrimaryTransParent]}
            >
              <Icon name="trash-outline" size={28} color="#76885B" />
            </TouchableOpacity>
            <P style={[typography.font16, { textAlign: "center", flex: 1 }]}>
              {item.name}
            </P>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[
          spacing.br5,
          styles.bgPrimaryTransParent,
          {
            borderColor: "#76885B",
            width: 60,
            height: 60,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 600,
          },
        ]}
      >
        <Icon name="add" size={30} color="#76885B" />
      </TouchableOpacity>

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          {
            justifyContent: "center",
            position: "absolute",
            top: 670,
            left: 0,
            right: 0,
          },
        ]}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          DISPATCH INVENTORY
        </H2>
      </Button>
    </View>
  );
};

export default TaskInventoryScreen;
