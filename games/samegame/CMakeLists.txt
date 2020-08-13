add_library(gamecenter_samegame)

kcoreaddons_desktop_to_json(gamecenter_samegame package/metadata.desktop)

install(TARGETS gamecenter_samegame DESTINATION ${KDE_INSTALL_PLUGINDIR}/gamecenter)
