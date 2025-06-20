USE [Database]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/27/2024 2:21:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Center]    Script Date: 4/27/2024 2:21:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Center](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Contact] [nvarchar](max) NOT NULL,
	[Address] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Center] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CenterVaccines]    Script Date: 4/27/2024 2:21:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CenterVaccines](
	[CenterId] [int] NOT NULL,
	[VaccineId] [int] NOT NULL,
 CONSTRAINT [PK_CenterVaccines] PRIMARY KEY CLUSTERED 
(
	[CenterId] ASC,
	[VaccineId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vaccine]    Script Date: 4/27/2024 2:21:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vaccine](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Precautions] [nvarchar](max) NOT NULL,
	[TimeGap] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Vaccine] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240424071934_add-center', N'8.0.4')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240424072706_add-vaccine', N'8.0.4')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240424161331_add-vaccine', N'8.0.4')
GO
SET IDENTITY_INSERT [dbo].[Center] ON 

INSERT [dbo].[Center] ([Id], [Name], [Description], [Contact], [Address]) VALUES (1, N'center', N'ssd', N'sdsd', N'sdfsdf')
INSERT [dbo].[Center] ([Id], [Name], [Description], [Contact], [Address]) VALUES (3, N'center2', N'hth', N'tht', N'fef')
INSERT [dbo].[Center] ([Id], [Name], [Description], [Contact], [Address]) VALUES (4, N'center', N'swqsq', N'sq', N'qsq')
INSERT [dbo].[Center] ([Id], [Name], [Description], [Contact], [Address]) VALUES (6, N'center5', N'jkjk', N'kjkj', N'kjkjk')
SET IDENTITY_INSERT [dbo].[Center] OFF
GO
INSERT [dbo].[CenterVaccines] ([CenterId], [VaccineId]) VALUES (1, 1)
INSERT [dbo].[CenterVaccines] ([CenterId], [VaccineId]) VALUES (3, 1)
INSERT [dbo].[CenterVaccines] ([CenterId], [VaccineId]) VALUES (4, 1)
INSERT [dbo].[CenterVaccines] ([CenterId], [VaccineId]) VALUES (1, 2)
INSERT [dbo].[CenterVaccines] ([CenterId], [VaccineId]) VALUES (3, 2)
INSERT [dbo].[CenterVaccines] ([CenterId], [VaccineId]) VALUES (6, 2)
GO
SET IDENTITY_INSERT [dbo].[Vaccine] ON 

INSERT [dbo].[Vaccine] ([Id], [Name], [Precautions], [TimeGap]) VALUES (1, N'vax1', N'hghhg', N'12')
INSERT [dbo].[Vaccine] ([Id], [Name], [Precautions], [TimeGap]) VALUES (2, N'vaxx2', N'mnkfnh', N'10')
SET IDENTITY_INSERT [dbo].[Vaccine] OFF
GO
ALTER TABLE [dbo].[CenterVaccines]  WITH CHECK ADD  CONSTRAINT [FK_CenterVaccines_Center_CenterId] FOREIGN KEY([CenterId])
REFERENCES [dbo].[Center] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CenterVaccines] CHECK CONSTRAINT [FK_CenterVaccines_Center_CenterId]
GO
ALTER TABLE [dbo].[CenterVaccines]  WITH CHECK ADD  CONSTRAINT [FK_CenterVaccines_Vaccine_VaccineId] FOREIGN KEY([VaccineId])
REFERENCES [dbo].[Vaccine] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CenterVaccines] CHECK CONSTRAINT [FK_CenterVaccines_Vaccine_VaccineId]
GO
