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

# Turn treatment to factor
R1$Treatment <- factor(R1$Treatment, lvlsTreatment)
R2$Treatment <- factor(R2$Treatment, lvlsTreatment)
R3$Treatment <- factor(R3$Treatment, lvlsTreatment)

# Add round info
R1 <- cbind(R1, "Round"=1)
R2 <- cbind(R2, "Round"=2)
R3 <- cbind(R3, "Round"=3)

# Turn conversation id to factor
R1$ConversationId <- factor(R1$ConversationId, lvlsConversationId)
R2$ConversationId <- factor(R2$ConversationId, lvlsConversationId)
R3$ConversationId <- factor(R3$ConversationId, lvlsConversationId)

# Round 1 analysis
# r1 <- subset(R1, select = c("Empathy","Treatment","Round"))
r1aov = aov(R1$Empathy ~ R1$Treatment * R1$ConversationId)
TukeyHSD(r1aov)

# Round 2 analysis
r2 = aggregate(R2$Empathy, list(id = R2$ResponseId), FUN = mean)
# r2 <- subset(R2, select = c("Empathy","Round"))
# r3 <- subset(R3, select = c("Empathy","Round"))

# mega = rbind(r1, r2, r3)
# mega$Round <- factor(mega$Round, c("1", "2", "3"))
# aov.out <- aov(mega$Empathy ~ mega$Round)
# TukeyHSD(aov.out)

# within round 1, T0 v T1
# within round 2, Precision for the whole person
# within round 3, Confidence for the whole