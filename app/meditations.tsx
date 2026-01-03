import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

interface MeditationSession {
    id: string;
    title: string;
    duration: string;
    image: any;
    isLocked: boolean;
}

type Mood = 'calm' | 'energetic' | 'stressed' | null;

const MEDITATION_SESSIONS: MeditationSession[] = [
    { id: '1', title: 'Утренняя медитация', duration: '10 мин', image: require('@/assets/images/meditation.jpg'), isLocked: false },
    { id: '2', title: 'Дыхание', duration: '5 мин', image: require('@/assets/images/meditation.jpg'), isLocked: false },
    { id: '3', title: 'Глубокий сон', duration: '20 мин', image: require('@/assets/images/meditation.jpg'), isLocked: true },
    { id: '4', title: 'Снятие стресса', duration: '15 мин', image: require('@/assets/images/meditation.jpg'), isLocked: true },
    { id: '5', title: 'Концентрация', duration: '12 мин', image: require('@/assets/images/meditation.jpg'), isLocked: true },
    { id: '6', title: 'Благодарность', duration: '8 мин', image: require('@/assets/images/meditation.jpg'), isLocked: true },
];

const AFFIRMATIONS = {
    calm: [
        "Сегодня я выбираю спокойствие. Каждый вдох наполняет меня умиротворением, каждый выдох уносит напряжение.",
        "Я нахожусь в гармонии с настоящим моментом. Мир внутри меня создаёт мир вокруг меня.",
        "Моё спокойствие — это моя сила. Я позволяю себе просто быть здесь и сейчас.",
    ],
    energetic: [
        "Я полон энергии и готов к новым свершениям! Каждая клетка моего тела наполнена жизненной силой.",
        "Сегодня я создаю свою реальность с энтузиазмом и радостью. Моя энергия притягивает возможности.",
        "Я чувствую силу внутри себя. Мои действия наполнены целеустремлённостью и вдохновением.",
    ],
    stressed: [
        "Я отпускаю то, что не могу контролировать. С каждым вдохом я возвращаю себе внутреннее равновесие.",
        "Это временно. Я справлюсь с любыми вызовами, делая один шаг за раз. Я сильнее, чем думаю.",
        "Я позволяю себе сделать паузу. Моё благополучие важнее спешки. Я достоин покоя и заботы.",
    ],
};

export default function MeditationsScreen() {
    const router = useRouter();
    const [hasSubscription] = useState(false); // Симуляция подписки
    const [selectedMood, setSelectedMood] = useState<Mood>(null);
    const [affirmation, setAffirmation] = useState<string>('');
    const [showAffirmation, setShowAffirmation] = useState(false);

    const handleSessionPress = (session: MeditationSession) => {
        if (session.isLocked && !hasSubscription) {
            // Переход обратно на экран подписки
            router.push('/subscription');
        } else {
            // Здесь будет переход на экран медитации
            console.log('Start meditation:', session.title);
        }
    };

    const handleMoodSelect = (mood: Mood) => {
        setSelectedMood(mood);
        setShowAffirmation(false);
    };

    const generateAffirmation = () => {
        if (!selectedMood) return;

        const moodAffirmations = AFFIRMATIONS[selectedMood];
        const randomIndex = Math.floor(Math.random() * moodAffirmations.length);
        setAffirmation(moodAffirmations[randomIndex]);
        setShowAffirmation(true);
    };

    return (
        <LinearGradient colors={['#F5F1E8', '#E8DCC8']} style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.header}>
                    <Text style={styles.title}>Медитации</Text>
                    <Text style={styles.subtitle}>Выберите сессию для начала</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* AI Mood Feature */}
                    <View style={styles.moodSection}>
                        <Text style={styles.moodTitle}>✨ AI Настрой дня</Text>
                        <Text style={styles.moodSubtitle}>Как вы себя чувствуете?</Text>

                        <View style={styles.moodSelector}>
                            <TouchableOpacity
                                style={[styles.moodButton, selectedMood === 'calm' && styles.moodButtonSelected]}
                                onPress={() => handleMoodSelect('calm')}
                            >
                                <Text style={styles.moodEmoji}>😌</Text>
                                <Text style={styles.moodLabel}>Спокойно</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.moodButton, selectedMood === 'energetic' && styles.moodButtonSelected]}
                                onPress={() => handleMoodSelect('energetic')}
                            >
                                <Text style={styles.moodEmoji}>⚡</Text>
                                <Text style={styles.moodLabel}>Энергично</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.moodButton, selectedMood === 'stressed' && styles.moodButtonSelected]}
                                onPress={() => handleMoodSelect('stressed')}
                            >
                                <Text style={styles.moodEmoji}>😰</Text>
                                <Text style={styles.moodLabel}>Стресс</Text>
                            </TouchableOpacity>
                        </View>

                        {selectedMood && !showAffirmation && (
                            <TouchableOpacity
                                style={styles.generateButton}
                                onPress={generateAffirmation}
                            >
                                <Text style={styles.generateButtonText}>Получить аффирмацию</Text>
                            </TouchableOpacity>
                        )}

                        {showAffirmation && (
                            <View style={styles.affirmationCard}>
                                <Text style={styles.affirmationText}>{affirmation}</Text>
                                <TouchableOpacity
                                    style={styles.regenerateButton}
                                    onPress={generateAffirmation}
                                >
                                    <Text style={styles.regenerateButtonText}>🔄 Ещё одна</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Sessions Grid */}
                    <Text style={styles.sessionsTitle}>Сессии медитации</Text>
                    <View style={styles.grid}>
                        {MEDITATION_SESSIONS.map((session) => (
                            <TouchableOpacity
                                key={session.id}
                                style={styles.card}
                                onPress={() => handleSessionPress(session)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={session.image}
                                        style={[
                                            styles.image,
                                            session.isLocked && !hasSubscription && styles.lockedImage
                                        ]}
                                    />
                                    {session.isLocked && !hasSubscription && (
                                        <View style={styles.lockOverlay}>
                                            <View style={styles.lockIcon}>
                                                <Text style={styles.lockIconText}>🔒</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.cardContent}>
                                    <Text
                                        style={[
                                            styles.sessionTitle,
                                            session.isLocked && !hasSubscription && styles.lockedText
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {session.title}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.duration,
                                            session.isLocked && !hasSubscription && styles.lockedText
                                        ]}
                                    >
                                        {session.duration}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>← Назад</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3E3226',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B5D4F',
        fontWeight: '400',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    // AI Mood Section
    moodSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#3E3226',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    moodTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3E3226',
        marginBottom: 4,
    },
    moodSubtitle: {
        fontSize: 14,
        color: '#6B5D4F',
        marginBottom: 16,
    },
    moodSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16,
    },
    moodButton: {
        flex: 1,
        backgroundColor: '#F5F1E8',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    moodButtonSelected: {
        borderColor: '#C9A86A',
        backgroundColor: '#FFF9F0',
    },
    moodEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },
    moodLabel: {
        fontSize: 12,
        color: '#3E3226',
        fontWeight: '600',
    },
    generateButton: {
        backgroundColor: '#3E3226',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    generateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    affirmationCard: {
        backgroundColor: '#FFF9F0',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#C9A86A',
    },
    affirmationText: {
        fontSize: 16,
        color: '#3E3226',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 16,
        fontStyle: 'italic',
    },
    regenerateButton: {
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    regenerateButtonText: {
        fontSize: 14,
        color: '#6B5D4F',
        fontWeight: '600',
    },
    // Sessions Section
    sessionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3E3226',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#3E3226',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: CARD_WIDTH * 1.2,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    lockedImage: {
        opacity: 0.3,
    },
    lockOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockIconText: {
        fontSize: 24,
    },
    cardContent: {
        padding: 12,
    },
    sessionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3E3226',
        marginBottom: 4,
        lineHeight: 20,
    },
    duration: {
        fontSize: 14,
        color: '#6B5D4F',
        fontWeight: '400',
    },
    lockedText: {
        color: '#A0A0A0',
    },
    backButton: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#6B5D4F',
        fontWeight: '600',
    },
});
