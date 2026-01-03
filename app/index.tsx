import SwipeButton from '@/components/SwipeButton';
import { Audio } from 'expo-av';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [resetKey, setResetKey] = useState(0);

    // Загрузка музыки при первом монтировании
    useEffect(() => {
        loadSound();

        return () => {
            // Очистка при размонтировании
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    // Воспроизведение музыки при фокусе на экране
    useFocusEffect(
        useCallback(() => {
            // Сбрасываем свайп при возврате на экран
            setResetKey(prev => prev + 1);

            if (sound) {
                sound.playAsync();
            }

            return () => {
                // Останавливаем музыку при уходе с экрана
                if (sound) {
                    sound.pauseAsync();
                }
            };
        }, [sound])
    );

    async function loadSound() {
        try {
            // Настройка аудио режима
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            });

            // Загрузка музыки
            const { sound: audioSound } = await Audio.Sound.createAsync(
                require('@/assets/audio/Per Samuelsson - Abandoned.mp3'),
                { shouldPlay: true, isLooping: true, volume: 0.5 }
            );

            setSound(audioSound);
        } catch (error) {
            console.error('Ошибка загрузки аудио:', error);
        }
    }

    const handleSwipeComplete = async () => {
        // Переход на экран подписки (музыка остановится через useFocusEffect)
        router.push('/subscription');
    };

    return (
        <ImageBackground
            source={require('@/assets/images/meditation.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Добро пожаловать</Text>
                        <Text style={styles.subtitle}>в мир спокойствия и гармонии</Text>
                    </View>

                    <View style={styles.bottomContainer}>
                        <SwipeButton key={resetKey} onSwipeComplete={handleSwipeComplete} />
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        opacity: 0.9,
        fontWeight: '300',
    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 60,
    },
});
