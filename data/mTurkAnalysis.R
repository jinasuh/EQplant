require(reshape2)  # this is the library that lets you flatten out data
require(ggplot2)   # plotting library

# the melt command flattens the 'bucket' list into value/vectorname pairs
# the 2 columns are called 'value' and 'L1' by default
# 'fill' will color bars differently depending on L1 group
#ggplot2::ggplot(reshape2::melt(musashiCushion), ggplot2::aes(value)) + 

#call geom_histogram with position="dodge" to offset the bars and manual binwidth of 2
#ggplot2::geom_histogram(position = "stack", binwidth=2)

# const
lvlsLiteracy = c('None','Limited','Professional','Native')
lvlsEmpathy = c('none','slightly','moderately','very','extremely')
lvlsTreatment = c(0, 1, 2, 3)
lvlsConversationId = c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
lvlsAgreement = c('strongdisagree','disagree','neutral','agree','strongagree')

# R sucks. sorry these are all absolute.
# load all data
R1 <- read.csv("C:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/R1_Summary.csv",
               header=TRUE, stringsAsFactors = FALSE,
               colClasses=c("Empathy"="factor"))
R2 <- read.csv("C:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/R2_Summary.csv",
               header=TRUE, stringsAsFactors = FALSE,
               colClasses=c("Empathy"="factor", "Precision"="factor"))
R2$Empathy <- as.character(R2$Empathy)
R2 <- subset(R2, Empathy != "0")
R2$Empathy <- factor(R2$Empathy, lvlsEmpathy)
R3 <- read.csv("C:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/R3_Summary.csv",
               header=TRUE, stringsAsFactors = FALSE,
               colClasses=c("Empathy"="factor", "Confidence"="factor"))

levels(R1$Empathy) <- lvlsEmpathy
levels(R2$Empathy) <- lvlsEmpathy
levels(R3$Empathy) <- lvlsEmpathy

# Turn empathy to numeric
R1$Empathy <- as.numeric(R1$Empathy)
R2$Empathy <- as.numeric(R2$Empathy)
R3$Empathy <- as.numeric(R3$Empathy)

# MOD - UNSAFE!
R1$Empathy <- sapply(R1$Empathy, function(x) x>4)
R2$Empathy <- sapply(R2$Empathy, function(x) x>4)
R3$Empathy <- sapply(R3$Empathy, function(x) x>4)

# Turn treatment to factor
R1$Treatment <- factor(R1$Treatment, lvlsTreatment)
R2$Treatment <- factor(R2$Treatment, lvlsTreatment)
R3$Treatment <- factor(R3$Treatment, lvlsTreatment)

# Turn responses to factor
R2$R_Discreet <- factor(R2$R_Discreet, lvlsAgreement)
R3$R_Discreet <- factor(R3$R_Discreet, lvlsAgreement)
R2$R_Effectiveness <- factor(R2$R_Effectiveness, lvlsAgreement)
R3$R_Effectiveness <- factor(R3$R_Effectiveness, lvlsAgreement)
R2$R_Efficiency <- factor(R2$R_Efficiency, lvlsAgreement)
R3$R_Efficiency <- factor(R3$R_Efficiency, lvlsAgreement)
R2$R_Intentuse <- factor(R2$R_Intentuse, lvlsAgreement)
R3$R_Intentuse <- factor(R3$R_Intentuse, lvlsAgreement)
R2$R_Satisfaction <- factor(R2$R_Satisfaction, lvlsAgreement)
R3$R_Satisfaction <- factor(R3$R_Satisfaction, lvlsAgreement)
R2$R_Transparency <- factor(R2$R_Transparency, lvlsAgreement)
R3$R_Transparency <- factor(R3$R_Transparency, lvlsAgreement)
R2$R_Trust <- factor(R2$R_Trust, lvlsAgreement)
R3$R_Trust <- factor(R3$R_Trust, lvlsAgreement)
R2$R_Useful <- factor(R2$R_Useful, lvlsAgreement)
R3$R_Useful <- factor(R3$R_Useful, lvlsAgreement)

# Turn empathy to numeric
R2$R_Discreet <- as.numeric(R2$R_Discreet)
R3$R_Discreet <- as.numeric(R3$R_Discreet)
R2$R_Effectiveness <- as.numeric(R2$R_Effectiveness)
R3$R_Effectiveness <- as.numeric(R3$R_Effectiveness)
R2$R_Efficiency <- as.numeric(R2$R_Efficiency)
R3$R_Efficiency <- as.numeric(R3$R_Efficiency)
R2$R_Intentuse <- as.numeric(R2$R_Intentuse)
R3$R_Intentuse <- as.numeric(R3$R_Intentuse)
R2$R_Satisfaction <- as.numeric(R2$R_Satisfaction)
R3$R_Satisfaction <- as.numeric(R3$R_Satisfaction)
R2$R_Transparency <- as.numeric(R2$R_Transparency)
R3$R_Transparency <- as.numeric(R3$R_Transparency)
R2$R_Trust <- as.numeric(R2$R_Trust)
R3$R_Trust <- as.numeric(R3$R_Trust)
R2$R_Useful <- as.numeric(R2$R_Useful)
R3$R_Useful <- as.numeric(R3$R_Useful)

# Add round info
R1 <- cbind(R1, "Round"=1)
R2 <- cbind(R2, "Round"=2)
R3 <- cbind(R3, "Round"=3)

# Turn conversation id to factor
R1$ConversationId <- factor(R1$ConversationId, lvlsConversationId)
R2$ConversationId <- factor(R2$ConversationId, lvlsConversationId)
R3$ConversationId <- factor(R3$ConversationId, lvlsConversationId)

# Round 1 analysis
r1 <- subset(R1, select = c("Empathy","Treatment","Round"))
r1aov = aov(R1$Empathy ~ R1$Treatment * R1$ConversationId)
boxplot(R1$Empathy ~ R1$Treatment * R1$ConversationId)
TukeyHSD(r1aov)

r1aov = aov(R1$Empathy ~ R1$Treatment)
plot(R1$Empathy ~ R1$Treatment)
TukeyHSD(r1aov)


# Round 2 analysis
r2 = aggregate(Empathy ~ ResponseId + Precision + R_Satisfaction + R_Trust + R_Useful, data = R2, FUN = mean)
r2aov = aov(r2$Empathy ~ r2$Precision)
TukeyHSD(r2aov)
plot(r2$Empathy ~ r2$Precision)
summary(r2)

# Round 3 analysis
r3 = aggregate(Empathy ~ ResponseId + Confidence + R_Satisfaction + R_Trust + R_Useful, data = R3, FUN = mean)
r3aov = aov(r3$Empathy ~ r3$Confidence)
TukeyHSD(r3aov)
plot(r3$Empathy ~ r3$Confidence)
summary(r3)

# export all this
write.table(R1, "c:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/output_R1.csv", sep=",")
write.table(r1, "c:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/output_r1_proced.csv", sep=",")
write.table(R2, "c:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/output_R2.csv", sep=",")
write.table(r2, "c:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/output_r2_proced.csv", sep=",")
write.table(R3, "c:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/output_R3.csv", sep=",")
write.table(r3, "c:/Users/phloh/OneDrive/Documents/HCDE/593B/mTurk/clean/output_r3_proced.csv", sep=",")

### summary of what we want
# within round 1, T0 v T1
# within round 2, Precision for the whole person
# within round 3, Confidence for the whole

### graveyard
# r2 <- subset(R2, select = c("Empathy","Round"))
# r3 <- subset(R3, select = c("Empathy","Round"))

# mega = rbind(r1, r2, r3)
# mega$Round <- factor(mega$Round, c("1", "2", "3"))
# aov.out <- aov(mega$Empathy ~ mega$Round)
# TukeyHSD(aov.out)