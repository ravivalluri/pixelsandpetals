import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface Value {
  title: string;
  description: string;
  color: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  memoji: string;
}

const AboutSection: React.FC = () => {
  const { colors } = useTheme();

  const values: Value[] = [
    {
      title: "Innovation",
      description: "We anticipate technology trends and leverage modern frameworks, cloud architectures, and best practices to deliver cutting-edge solutions.",
      color: "#FF6B6B",
      icon: "🚀"
    },
    {
      title: "Quality",
      description: "We uphold the highest standards in code integrity, performance, and user experience, ensuring reliable and maintainable software.",
      color: "#4ECDC4",
      icon: "✨"
    },
    {
      title: "Collaboration",
      description: "We achieve the best outcomes by partnering closely with clients, integrating feedback, and aligning technical solutions with business goals.",
      color: "#45B7D1",
      icon: "🤝"
    },
    {
      title: "Sustainability",
      description: "We design systems that are scalable, maintainable, and future-proof, ensuring long-term value for every project.",
      color: "#96CEB4",
      icon: "🌱"
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Ravi Valluri",
      role: "Founder & CEO",
      bio: "15+ years in software architecture and product development",
      memoji: "👨🏽‍💻",
    },
    {
      name: "Maia Valluri",
      role: "Design Director",
      bio: "Creating beautiful and functional user experiences for 10+ years",
      memoji: "👩🏻‍🎨",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      paddingVertical: spacing[12],
      paddingHorizontal: spacing[6],
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing[10],
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[4],
    },
    sectionSubtitle: {
      fontSize: 16,
      color: colors.textSubtle,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: width * 0.9,
      marginBottom: spacing[8],
    },
    storySection: {
      marginBottom: spacing[10],
    },
    storyTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[6],
    },
    storyParagraph: {
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 24,
      textAlign: 'center',
      marginBottom: spacing[4],
    },
    sectionHeading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[6],
    },
    valuesGrid: {
      marginBottom: spacing[10],
    },
    valueCard: {
      backgroundColor: colors.surfaceBackground,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: spacing[5],
      marginBottom: spacing[4],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
      overflow: 'hidden',
      position: 'relative',
    },
    valueBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
    },
    valueHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[4],
    },
    valueIcon: {
      fontSize: 32,
      marginRight: spacing[3],
      backgroundColor: colors.glassBackground,
      width: 60,
      height: 60,
      borderRadius: 30,
      textAlign: 'center',
      lineHeight: 60,
      borderWidth: 2,
      borderColor: colors.glassBorder,
    },
    valueContent: {
      flex: 1,
    },
    valueTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: spacing[2],
    },
    valueDescription: {
      fontSize: 14,
      color: colors.textSubtle,
      lineHeight: 20,
    },
    valueAccentLine: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
    },
    teamSection: {
      alignItems: 'center',
    },
    teamSubheadline: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: spacing[8],
      maxWidth: width * 0.9,
    },
    teamGrid: {
      width: '100%',
    },
    teamMemberCard: {
      backgroundColor: colors.surfaceBackground,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: spacing[6],
      alignItems: 'center',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
      marginBottom: spacing[4],
    },
    memberAvatar: {
      fontSize: 48,
      marginBottom: spacing[4],
      textAlign: 'center',
      backgroundColor: colors.glassBackground,
      width: 80,
      height: 80,
      borderRadius: 40,
      lineHeight: 80,
      borderWidth: 2,
      borderColor: colors.primaryAccent,
    },
    memberInfo: {
      alignItems: 'center',
    },
    memberName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[2],
    },
    memberRole: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryAccent,
      textAlign: 'center',
      marginBottom: spacing[3],
    },
    memberBio: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionSubtitle}>
            Engineering scalable software. Designing seamless digital experiences.
          </Text>
        </View>

        {/* Our Story Section */}
        <View style={styles.storySection}>
          <Text style={styles.storyTitle}>Our Story</Text>
          <Text style={styles.storyParagraph}>
            Founded in 2018, Pixels & Petals started as a small team of developers and designers united by a vision: to build digital products that are both high-performing and elegantly designed.
          </Text>
          <Text style={styles.storyParagraph}>
            Today, we've grown into a cross-functional team of engineers, architects, and UX specialists, delivering web and mobile applications, cloud-native architectures, and scalable platforms. We collaborate with startups and enterprises across industries, turning complex technical challenges into innovative, user-centered solutions.
          </Text>
        </View>

        {/* Our Values Section */}
        <Text style={styles.sectionHeading}>Our Values</Text>
        <View style={styles.valuesGrid}>
          {values.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.valueCard,
                {
                  shadowColor: value.color,
                  borderColor: `${value.color}40`,
                },
              ]}
              activeOpacity={0.9}
            >
              {/* Background gradient accent */}
              <View
                style={[
                  styles.valueBackground,
                  {
                    backgroundColor: `${value.color}15`,
                  },
                ]}
              />

              <View style={styles.valueHeader}>
                {/* Icon */}
                <Text
                  style={[
                    styles.valueIcon,
                    {
                      backgroundColor: `${value.color}20`,
                      borderColor: `${value.color}40`,
                    },
                  ]}
                >
                  {value.icon}
                </Text>

                <View style={styles.valueContent}>
                  <Text style={styles.valueTitle}>{value.title}</Text>
                </View>
              </View>

              <Text style={styles.valueDescription}>
                {value.description}
              </Text>

              {/* Bottom accent line */}
              <View
                style={[
                  styles.valueAccentLine,
                  {
                    backgroundColor: value.color,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Team Section */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionHeading}>Meet Our Team</Text>
          <Text style={styles.teamSubheadline}>
            Our team of engineers, designers, and cloud architects brings together deep technical expertise and creative problem-solving. We collaborate closely to deliver scalable, high-performance software solutions that drive real-world impact.
          </Text>

          <View style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <TouchableOpacity
                key={index}
                style={styles.teamMemberCard}
                activeOpacity={0.9}
              >
                <Text style={styles.memberAvatar}>
                  {member.memoji}
                </Text>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>
                    {member.name}
                  </Text>
                  <Text style={styles.memberRole}>
                    {member.role}
                  </Text>
                  <Text style={styles.memberBio}>
                    {member.bio}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutSection;