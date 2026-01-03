import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface SwipeButtonProps {
    onSwipeComplete: () => void;
    text?: string;
}

const BUTTON_WIDTH = 320;
const DROPLET_SIZE = 70;
const SWIPE_THRESHOLD = BUTTON_WIDTH - DROPLET_SIZE - 10;

export default function SwipeButton({ onSwipeComplete, text = 'Свайпните, чтобы начать' }: SwipeButtonProps) {
    const translateX = useSharedValue(0);

    // Сброс позиции при монтировании компонента
    useEffect(() => {
        translateX.value = withSpring(0);
    }, []);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Ограничиваем движение капли
            translateX.value = Math.max(0, Math.min(event.translationX, SWIPE_THRESHOLD));
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD * 0.8) {
                // Свайп завершен
                translateX.value = withSpring(SWIPE_THRESHOLD);
                runOnJS(onSwipeComplete)();
            } else {
                // Возврат в начальную позицию
                translateX.value = withSpring(0);
            }
        });

    const dropletAnimatedStyle = useAnimatedStyle(() => {
        // Эффект увеличения при движении
        const scale = interpolate(
            translateX.value,
            [0, SWIPE_THRESHOLD / 2, SWIPE_THRESHOLD],
            [1, 1.1, 1]
        );

        return {
            transform: [
                { translateX: translateX.value },
                { scale },
            ],
        };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
        // Текст становится более прозрачным при движении капли
        const opacity = interpolate(
            translateX.value,
            [0, SWIPE_THRESHOLD],
            [1, 0.3]
        );

        return { opacity };
    });

    return (
        <View style={styles.container}>
            <View style={styles.track}>
                <Animated.Text style={[styles.text, textAnimatedStyle]}>
                    {text}
                </Animated.Text>

                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.droplet, dropletAnimatedStyle]}>
                        <View style={styles.dropletInner}>
                            <View style={styles.dropletShine} />
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    track: {
        width: BUTTON_WIDTH,
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 35,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    droplet: {
        position: 'absolute',
        left: 5,
        width: DROPLET_SIZE,
        height: DROPLET_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropletInner: {
        width: '100%',
        height: '100%',
        borderRadius: DROPLET_SIZE / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        // Эффект стекла/воды
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    dropletShine: {
        position: 'absolute',
        top: 8,
        left: 12,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        // Блик внутри капли
    },
});
