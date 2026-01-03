import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubscriptionScreen() {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#F5F1E8', '#E8DCC8']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.content}>
                    <Text style={styles.title}>Подписка</Text>
                    <Text style={styles.subtitle}>Выберите подходящий план</Text>

                    <View style={styles.plansContainer}>
                        <View style={styles.planCard}>
                            <Text style={styles.planTitle}>Месячная</Text>
                            <Text style={styles.planPrice}>₽499/месяц</Text>
                            <Text style={styles.planFeature}>• Безлимитные медитации</Text>
                            <Text style={styles.planFeature}>• Без рекламы</Text>
                            <Text style={styles.planFeature}>• Офлайн режим</Text>
                        </View>

                        <View style={[styles.planCard, styles.popularCard]}>
                            <View style={styles.popularBadge}>
                                <Text style={styles.popularText}>ПОПУЛЯРНО</Text>
                            </View>
                            <Text style={styles.planTitle}>Годовая</Text>
                            <Text style={styles.planPrice}>₽3990/год</Text>
                            <Text style={styles.planSavings}>Экономия 33%</Text>
                            <Text style={styles.planFeature}>• Все функции месячной</Text>
                            <Text style={styles.planFeature}>• Эксклюзивный контент</Text>
                            <Text style={styles.planFeature}>• Приоритетная поддержка</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/meditations')}
                    >
                        <Text style={styles.buttonText}>Начать бесплатный период</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backText}>Назад</Text>
                    </TouchableOpacity>
                </View>
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#3E3226',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B5D4F',
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: '400',
    },
    plansContainer: {
        gap: 20,
        marginBottom: 40,
    },
    planCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        borderWidth: 2,
        borderColor: '#D4C4B0',
        shadowColor: '#3E3226',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    popularCard: {
        backgroundColor: '#FFF9F0',
        borderColor: '#C9A86A',
        borderWidth: 3,
        position: 'relative',
    },
    popularBadge: {
        position: 'absolute',
        top: -12,
        right: 20,
        backgroundColor: '#C9A86A',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    popularText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    planTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3E3226',
        marginBottom: 8,
    },
    planPrice: {
        fontSize: 20,
        color: '#6B5D4F',
        fontWeight: '600',
        marginBottom: 4,
    },
    planSavings: {
        fontSize: 14,
        color: '#C9A86A',
        fontWeight: '700',
        marginBottom: 16,
    },
    planFeature: {
        fontSize: 14,
        color: '#6B5D4F',
        marginBottom: 6,
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#3E3226',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#3E3226',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    backText: {
        color: '#6B5D4F',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
});

