/**
 * PowerPaint
 * Assignment 5
 * Spring 2017 TCSS 305
 */
package gui;

import action.CircleAction;
import action.EllipseAction;
import action.EraserAction;
import action.LineAction;
import action.PencilAction;
import action.RectangleAction;
import action.SquareAction;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.List;
import javax.swing.Action;
import javax.swing.ImageIcon;
import javax.swing.JCheckBox;
import javax.swing.JColorChooser;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JRadioButtonMenuItem;
import javax.swing.JSlider;



/**
 * 
 * Power Paint. Allows painting using tools and shapes. 
 * Can erase and select primary and secondary colors, 
 * as well as display different information and selection
 * of thickness of the drawing as well as fill.
 * 
 * @author Jacob Reed
 * @version Apr 28, 2017
 *
 */
public class PowerPaintGUI extends JPanel {
    
    /** Generated SUID. */
    private static final long serialVersionUID = 3904434817686336323L;
    /** Default paint panel size. */
    private static final Dimension PAINT_PANEL_SIZE = new Dimension(400, 400);
    /** Thickness max. */
    private static final int THICK_MAX = 20;
    /**Thickness interval. */
    private static final int THICK_INT = 5;
    /**UW PURPLE. */
    private static final Color UW_PURP = new Color(51, 0, 111, 100);
    /** UW GOLD. */
    private static final Color UW_GOLD = new Color(145, 123, 76, 100);
    /** Window title and about info icon. */
    private static final String ICON_PATH = "images/window.png";
    /** Clear item. */
    private static JMenuItem myClearItem;
    /** Main frame. */
    private JFrame myFrame;
    /** Tool bar. */
    private PaintToolbar myToolbar;
    /** Temporary drawing panel. */
    private PaintPanel myPaintPanel;
    /** Menu Bar. */
    private final JMenuBar myMenuBar;
    /** Thickness Slider. */
    private JSlider myThickSlider;
    /** File Menu. */
    private JMenu myFileMenu;
    /** Options Menu. */
    private JMenu myOptionsMenu;
    /** Tools Menu. */
    private JMenu myToolsMenu;
    /** Help Menu. */
    private JMenu myHelpMenu;
    /**Primary color icon. */
    private final ColorIcon myPrimColorIcon;
    /** Secondary color icon. */
    private final ColorIcon mySecColorIcon;
    /** List to hold tool actions. */
    private List<Action> myToolActionList;
    /** Fill checkbox. */
    private boolean myFill;
 

    

    
    /**
     * Constructor.
     */
    public PowerPaintGUI() {
        myFrame = new JFrame();
        myFrame.setLayout(new BorderLayout());
        myMenuBar = new JMenuBar();
        myPrimColorIcon = new ColorIcon(UW_PURP);
        mySecColorIcon = new ColorIcon(UW_GOLD);
        myFill = false;     
    }
    
    /**
     * Creates button based on action.
     * @param theAction action of button.
     */
    private void createToolMenuButton(final Action theAction) {
        final JRadioButtonMenuItem resultButton = new JRadioButtonMenuItem(theAction);
        myToolsMenu.setMnemonic(KeyEvent.VK_T);
        resultButton.setIcon(null);
        myToolsMenu.add(resultButton);
    }
    
    /**
     * Enables/Disables clear menu item.
     * @param theClear True to enable, false to disable.
     */
    static void enableClear(final boolean theClear) {
        if (theClear) {
            myClearItem.setEnabled(true);
        } else {
            myClearItem.setEnabled(false);
        }
    }
    
    /**
     * Handles Primary color selection.
     */
    private void primaryColorOption() {
        final JMenuItem primaryColor = new JMenuItem("Primary Color...");
        primaryColor.setMnemonic(KeyEvent.VK_P);
        primaryColor.setIcon(myPrimColorIcon);
        primaryColor.addActionListener(e -> {
            final Color result = JColorChooser.showDialog(null, "Select color", UW_PURP); 
            //Sets color icon.
            myPrimColorIcon.setColor(result);
            //Sets painting colors.
            myPaintPanel.setColors(result, myPaintPanel.getSecColor());
        });
        myOptionsMenu.add(primaryColor);
    }
    /**
     * Handles secondary color selection.
     */
    private void secondaryColorOption() {
        final JMenuItem secColor = new JMenuItem("Secondary Color...");
        secColor.setMnemonic(KeyEvent.VK_S);
        secColor.setIcon(mySecColorIcon);
        secColor.addActionListener(e -> {
            final Color result = JColorChooser.showDialog(null, "Select a color", UW_GOLD); 
            //Sets color icon
            mySecColorIcon.setColor(result);
            //Sets painting colors.
            myPaintPanel.setColors(myPaintPanel.getPrimColor(), result);
        });
        myOptionsMenu.add(secColor);
    }
    
    /**
     * Setups drawing panel.
     */
    private void setupDrawingPanel() {
        myPaintPanel = new PaintPanel();
        myPaintPanel.setPreferredSize(PAINT_PANEL_SIZE);
        myFrame.add(myPaintPanel, BorderLayout.CENTER);
    }
    /** 
     * Setups menu bar.
     */
    private void setupMenuBar() {
        //Setups each menu
        setupMenuBarFile();
        setupMenuBarOptions();
        setupMenuBarTools();
        setupMenuBarHelp();
        
        //Add all to menu bar
        myMenuBar.add(myFileMenu);
        myMenuBar.add(myOptionsMenu);
        myMenuBar.add(myToolsMenu);
        myMenuBar.add(myHelpMenu);
    }
    
    /**
     * Setups File menu bar.
     */
    private void setupMenuBarFile() {
        //FILE
        myFileMenu = new JMenu("File");
        myFileMenu.setMnemonic(KeyEvent.VK_F);
        //---------Clear
        myClearItem = new JMenuItem("Clear");
        myClearItem.setMnemonic(KeyEvent.VK_C);
        enableClear(false);
        myClearItem.addActionListener(e -> {
            //Clear paint panel
            myPaintPanel.clearPanel(true);
        });
        myFileMenu.add(myClearItem);
        myFileMenu.addSeparator();
        //---------Quit
        final JMenuItem quitItem = new JMenuItem("Quit");
        quitItem.setMnemonic(KeyEvent.VK_Q);
        quitItem.addActionListener(e -> {
            //Close application
            myFrame.dispose();
        });
        myFileMenu.add(quitItem);
    }
    
    /**
     * Setups Help menu bar.
     */
    private void setupMenuBarHelp() {
      //HELP
        myHelpMenu = new JMenu("Help");
        myHelpMenu.setMnemonic(KeyEvent.VK_H);
        //---------About
        final JMenuItem aboutItem = new JMenuItem("About...");
        aboutItem.setMnemonic(KeyEvent.VK_A);
        aboutItem.addActionListener(e -> {
            JOptionPane.showMessageDialog(myFrame,
                                        "Jacob Reed\nSpring 2017\nTCSS 305 PowerPaint",
                                        "About",
                                        0, new ImageIcon(ICON_PATH));
        });
        //Add to menu bar
        myHelpMenu.add(aboutItem);
    }
    
    /**
     * Setups Options Menu Bar.
     */
    private void setupMenuBarOptions() {
      //OPTIONS
        myOptionsMenu = new JMenu("Options");
        myOptionsMenu.setMnemonic(KeyEvent.VK_O);
        //--------Thickness
        final JMenu thicknessMenu = new JMenu("Thickness");
        thicknessMenu.setMnemonic(KeyEvent.VK_T);
        myOptionsMenu.add(thicknessMenu);
        //------------> Slider
        thicknessMenu.add(myThickSlider);
        myThickSlider.addChangeListener(e -> {
            //Sets thickness based on return value of slider when changed.
            myPaintPanel.setThick(myThickSlider.getValue());
        });
        myOptionsMenu.addSeparator();
        //--------Primary Color
        primaryColorOption();
        //--------Secondary Color
        secondaryColorOption();
        myOptionsMenu.addSeparator();
        //--------Fill
        final JCheckBox fillBox = new JCheckBox("Fill");
        fillBox.setMnemonic(KeyEvent.VK_F);
        fillBox.addActionListener(e -> {
            if (fillBox.isSelected()) {
                myPaintPanel.setFill(true);
            } else {
                myPaintPanel.setFill(false);
            }
        });
        myOptionsMenu.add(fillBox);
    }
    
    /**
     * Setups Tools Menu Bar.
     */
    private void setupMenuBarTools() {
        myToolsMenu = new JMenu("Tools");
        myToolsMenu.setMnemonic(KeyEvent.VK_T);
         //For all tools in list create the tool menu buttons
        for (final Action x : myToolActionList) {
            createToolMenuButton(x);
        }     
    }
    /**
     * Setups thickness slider for menu.
     */
    private void setupThickSlider() {
        myThickSlider = new JSlider(JSlider.HORIZONTAL, 0,
                                    THICK_MAX, 1);
        myThickSlider.setMajorTickSpacing(THICK_INT);
        myThickSlider.setMinorTickSpacing(1);
        myThickSlider.setPaintLabels(true);
        myThickSlider.setPaintTicks(true);
    }
    
    /**
     * Setups tool bar.
     */
    private void setupToolBar() {
        //ALL MNEMONICS are activated using ALT + mnemonic.
        myToolbar = new PaintToolbar();
        myFrame.add(myToolbar, BorderLayout.SOUTH);
        //Create list of tools. Easier to add new tools this way.
        myToolActionList = new ArrayList<Action>();
        myToolActionList.add(new PencilAction(myPaintPanel));
        myToolActionList.add(new LineAction(myPaintPanel));
        myToolActionList.add(new RectangleAction(myPaintPanel));
        myToolActionList.add(new SquareAction(myPaintPanel));
        myToolActionList.add(new EllipseAction(myPaintPanel));
        myToolActionList.add(new CircleAction(myPaintPanel));
        myToolActionList.add(new EraserAction(myPaintPanel));
        //For all tools in list create the tool bar buttons
        for (final Action x : myToolActionList) {
            myToolbar.createButton(x);
        }        
    }
    
    /**
     * Runs main GUI upon parent call.
     */
    public void start() {
        //Main Setup
        myFrame.setTitle("PowerPaint");
        myFrame.setResizable(true);
        myFrame.setLocationRelativeTo(null);
        myFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        final ImageIcon windowIcon = new ImageIcon(ICON_PATH);
        myFrame.setIconImage(windowIcon.getImage());
       
        //Drawing Panel
        setupDrawingPanel();
        setupToolBar();
        
        //Menu Bar
        setupThickSlider();
        setupMenuBar();
        myFrame.add(myMenuBar, BorderLayout.NORTH);
        
        //Pack and show
        myFrame.pack();
        myFrame.setVisible(true);
    }
    
    /**
     * Gets Fill value.
     * @return Fill value for true, empty false.
     */
    public boolean getFill() {
        return myFill;
    }

}
