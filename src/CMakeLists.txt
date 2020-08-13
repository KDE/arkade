# package 
# copied from https://invent.kde.org/frameworks/plasma-framework/-/blob/master/src/plasma/packagestructure/CMakeLists.txt
function(install_package_structure name)
    add_library(${name}_packagestructure MODULE ${name}package.cpp)
    target_link_libraries(${name}_packagestructure PRIVATE KF5::Package KF5::I18n)
    install(TARGETS ${name}_packagestructure DESTINATION ${KDE_INSTALL_PLUGINDIR}/kpackage/packagestructure)

    set_target_properties(
        ${name}_packagestructure
        PROPERTIES LIBRARY_OUTPUT_DIRECTORY "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/kpackage/packagestructure"
    )

endfunction()

install_package_structure(game)

# apps
qt5_add_resources(gamecenter_SRCS resources.qrc)
add_executable(gamecenter main.cpp ${gamecenter_SRCS})
target_link_libraries(gamecenter Qt5::Core Qt5::Gui Qt5::Qml Qt5::Quick Qt5::QuickControls2 Qt5::Svg KF5::I18n KF5::Package)
install(TARGETS gamecenter ${KF5_INSTALL_TARGETS_DEFAULT_ARGS})

set(gamestructure_SRCS
    gamepackagestructure.cpp
)
