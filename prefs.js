const { Adw, Gio, Gtk } = imports.gi
const Me = imports.misc.extensionUtils.getCurrentExtension()

function init() {}

function fillPreferencesWindow(window) {
  window.set_search_enabled(true)

  const settings = imports.misc.extensionUtils.getSettings("org.gnome.shell.extensions.workspaces-indicator-by-open-apps")

  let page

  page = new Adw.PreferencesPage({
    name: "general",
    title: "General",
    icon_name: "dialog-information-symbolic" // TODO: change icon
  })
  page.add(page1_group1(settings))




  window.add(page)
}

function page1_group1(settings) {
  let group, row, widget

  group = new Adw.PreferencesGroup({
    title: "Position",
    description: ""
  })

  row = new Adw.ActionRow({
    title: "Panel position",
    subtitle: "Panel to show the indicator in"
  })
  widget = new Gtk.ComboBoxText({
    valign: Gtk.Align.CENTER,
  })
  widget.append("LEFT", "Left")
  widget.append("CENTER", "Center")
  widget.append("RIGHT", "Right")
  settings.bind("position-in-panel", widget, "active-id", Gio.SettingsBindFlags.DEFAULT)
  row.add_suffix(widget)
  row.activatable_widget = widget
  group.add(row)

  row = new Adw.ActionRow({
    title: "Position index",
    subtitle: "Number of other elements in the panel before the indicator"
  })
  widget = new Gtk.SpinButton({
    valign: Gtk.Align.CENTER,
  })
  widget.set_sensitive(true)
  widget.set_range(0, 50)
  widget.set_value(settings.get_int("position-index"))
  widget.set_increments(1, 2)
  widget.connect(
    "value-changed",
    w => {
      settings.set_int(
        "position-index", 
        w.get_value_as_int()
      )
  })
  row.add_suffix(widget)
  row.activatable_widget = widget
  group.add(row)

  return group
}
