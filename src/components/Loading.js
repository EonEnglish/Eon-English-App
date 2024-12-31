import PropTypes from "prop-types";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loading = ({ children, style, isLoading = true }) => {
  return (
    <View style={style}>
      {isLoading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            size="large"
            color="#cccccc"
            animating={isLoading}
            style={styles.indicator}
          />
        </View>
      )}
      <View
        style={isLoading ? styles.invisibleChildren : styles.visibleChildren}
      >
        {children}
      </View>
    </View>
  );
};

Loading.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  visibleChildren: {
    height: "100%",
  },
  invisibleChildren: {
    display: "none",
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
