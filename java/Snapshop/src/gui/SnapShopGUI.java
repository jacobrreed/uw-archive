/*
 * TCSS 305 - Assignment 4: SnapShop
 */

package gui;

import filters.EdgeDetectFilter;
import filters.EdgeHighlightFilter;
import filters.Filter;
import filters.FlipHorizontalFilter;
import filters.FlipVerticalFilter;
import filters.GrayscaleFilter;
import filters.SharpenFilter;
import filters.SoftenFilter;
import image.PixelImage;
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;


/**
 *
 * SnapShopGUI
 * Front end code written to accommodate the backend code given by the professor.
 * @author Jacob Reed
 * @version Apr 21, 2017
 *
 */
public class SnapShopGUI extends JFrame {
    //CONSTANTS
    /** Generated UID required when using JFrame. */
    private static final long serialVersionUID = -2144739668936849562L;
    /** Open...  string to by used for button labeling process and for disabling buttons.*/
    private static final String OPEN_STRING = "Open...";
    /** Button spacing since I'm using GridLayout. */
    private static final int BUTTON_SPACE = 10;
    //Instance Fields
    /** Main JPanel. */
    private JPanel myPanel;
    /** Button Panel. */
    private JPanel myButtonPanel;
    /** Top Button Panel. */
    private JPanel myTopButtonPanel;
    /** Bottom Button Panel. */
    private JPanel myBottomButtonPanel;
    /** Image Panel. */
    private JPanel myImagePanel;
    /**Image Label. */
    private JLabel myImageLabel;
    /** JButton List. */
    private List<JButton> myFilterButtonList;
    /** JButton List. */
    private List<JButton> myOptionButtonList;
    /** JFileChooser for opening and saving. */
    private JFileChooser myFileChooser;
    /** File. */
    private File myFile;
    /** Image File. */
    private PixelImage myImage;
    /** Icon to hold image. */
    private ImageIcon myImageIcon;
    /** Default window size. */
    private Dimension myDefaultWindowSize;
    /** List that holds filters. */
    private List<Filter> myFilterList;
    /** Option Button Labels. */
    private String[] myOptionLabels = {OPEN_STRING, "Save As...",
                                       "Close Image"};


    
    /**
     * Constructor.
     */
    public SnapShopGUI() {
        //Instance fields that can be instantiated now
        myFileChooser = new JFileChooser(".");
        myFilterButtonList = new LinkedList<JButton>();
        myOptionButtonList = new LinkedList<JButton>();
        myFilterList = new LinkedList<Filter>();
    }
    /**
     * Closes file.
     */
    private void closeFile() {
        //Remove image
        myImageLabel.setIcon(null);
        //disable buttons
        disableButtons();
        //re-pack
        this.pack();
        //Reset to default minimum size and window size
        this.setMinimumSize(myDefaultWindowSize);
        this.setSize(myDefaultWindowSize);
    }
    
    /**
     * Creates all filter buttons and stores in list.
     */
    private void createFilterButtons() {
        for (Filter x : myFilterList) {
            myFilterButtonList.add(filterButtonWListener(x));
        }
        //Now add all buttons in list to panel.
        for (JButton x : myFilterButtonList) {
            myTopButtonPanel.add(x);
        }
    }
    
    /**
     * Creates the list of filters.
     */
    private void createFilterList() {
        myFilterList.add(new EdgeDetectFilter());
        myFilterList.add(new EdgeHighlightFilter());
        myFilterList.add(new FlipHorizontalFilter());
        myFilterList.add(new FlipVerticalFilter());
        myFilterList.add(new GrayscaleFilter());
        myFilterList.add(new SharpenFilter());
        myFilterList.add(new SoftenFilter());
    }
    
    /**
     * Setups components for window such as JPanel and layout manager.
     */
    private void createLayout() {
        //Main Panel
        myPanel = new JPanel(new BorderLayout());
        //Button Panel held in west, which holds the children button panels.
        myButtonPanel = new JPanel(new BorderLayout());
        //Button container panels
        myBottomButtonPanel = new JPanel(new GridLayout(0, 1, BUTTON_SPACE, BUTTON_SPACE));
        myTopButtonPanel = new JPanel(new GridLayout(0, 1, BUTTON_SPACE, BUTTON_SPACE));
        //Add top & bottom button panels to container button panel.
        myButtonPanel.add(myTopButtonPanel, BorderLayout.NORTH);
        myButtonPanel.add(new JPanel(), BorderLayout.CENTER);
        myButtonPanel.add(myBottomButtonPanel, BorderLayout.SOUTH);
        //Add button panel to main panel.
        myPanel.add(myButtonPanel, BorderLayout.WEST);
        //Image Label area
        //Grid Layout that causes the image to stay left aligned
        myImagePanel = new JPanel(new GridLayout(0, 1));
        //Holds Image
        myImageLabel = new JLabel();
        //Add image label to panel
        myImagePanel.add(myImageLabel);
        //Add image panel to main panel
        myPanel.add(myImagePanel, BorderLayout.CENTER);
        //Add main panel & button panel to main frame
        this.add(myPanel);
    }
    
    /**
     * Creates all option buttons based on string array and adds listeners to each,
     * then adds listeners to each with a switch/case statement.
     */
    private void createOptionButtons() {
        //CREATE OPTION BUTTONS based off myOptionLabels[]
        //then add to panel
        for (String x : myOptionLabels) {
            myOptionButtonList.add(new JButton(x));
        }
        
        //Add listeners to buttons
        for (int i = 0; i < myOptionButtonList.size(); i++) {
            myBottomButtonPanel.add(myOptionButtonList.get(i));
            switch (i) {
                //OPEN BUTTON
                case 0: myOptionButtonList.get(i).addActionListener(e -> { 
                    openFile(); });
                    break;
                //SAVE BUTTON
                case 1: myOptionButtonList.get(i).addActionListener(e -> { 
                    saveFile(); });
                    break;
                //CLOSE BUTTON
                case 2: myOptionButtonList.get(i).addActionListener(e -> { 
                    closeFile(); });
                    break;
                //Default clause for switch statement - SHOULD NEVER HAPPEN
                default: break;
            }
        }                   
    }
       
    /**
     * Disabled all buttons except for "Open...".
     */
    private void disableButtons() {
        for (int i = 0; i < myOptionButtonList.size(); i++) {
            //if not Open button disable
            if (myOptionButtonList.get(i).getText().equals(OPEN_STRING)) {
                myOptionButtonList.get(i).setEnabled(true);
            } else {
                myOptionButtonList.get(i).setEnabled(false);
            }
        }
        //For every filter button disable
        for (JButton x : myFilterButtonList) {
            x.setEnabled(false);
        }
    }
    
    /**
     * Enables all buttons.
     */
    private void enableButtons() {
        //Option buttons
        for (JButton x : myOptionButtonList) {
            x.setEnabled(true);
        }
        //Filter buttons
        for (JButton x : myFilterButtonList) {
            x.setEnabled(true);
        }
    }
    
    /**
     * Creates a filter button based on name of filter,
     * then returns the button.
     * @param theFilter Filter to create a button for.
     * @return JButton.
     */
    private JButton filterButtonWListener(final Filter theFilter) {
        //button created with name of filter
        final JButton result = new JButton(theFilter.getDescription());
        
        /**
         * Class to add ActionListener to the button.
         * @author Jacob Reed
         * @version Apr 26, 2017
         *
         */
        class FilterListener implements ActionListener {

            @Override
            public void actionPerformed(final ActionEvent theEvent) {
                theFilter.filter(myImage);
                myImageLabel.setIcon(new ImageIcon(myImage));
            }
        }
        //Add listener to button
        result.addActionListener(new FilterListener());
        //Return button
        return result;
    }
    
    /**
     * Opens file and gives a warning if non image.
     */
    private void openFile() {
        final int returnVal = myFileChooser.showOpenDialog(null);
        //if they choose select
        if (returnVal == JFileChooser.APPROVE_OPTION) {
            myFile = myFileChooser.getSelectedFile();
            try {
                //Try to set the image as PixelImage and JLabel icon
                myImage = PixelImage.load(myFile);
                myImageIcon = new ImageIcon(myImage);
                myImageLabel.setIcon(myImageIcon);
                /*Reset minimum size requirements
                for every image load*/
                this.setMinimumSize(null);
                //resize
                this.pack();
                //Set minimum size requirement
                this.setMinimumSize(this.getSize());
                enableButtons();  
            } catch (final IOException exception) {
                //If file is not an image file
                JOptionPane.showMessageDialog(null, 
                            "The selected file did not contain an image!");
            }
        }
    }
    
    /**
     * Saves file.
     */
    private void saveFile() {
        final int result = myFileChooser.showSaveDialog(null);
        //If user selects save option
        if (result == JFileChooser.APPROVE_OPTION) {
            try {
                //try to save
                myImage.save(myFileChooser.getSelectedFile());
            } catch (final IOException exception) {
                JOptionPane.showMessageDialog(null, "Could not save file!");
            }
        }
    }
    
    /**
     * Starts GUI.
     */
    public void start() {
        setTitle("TCSS 305 SnapShop");
        //Open the window center screen
        setLocationRelativeTo(null);
        //Close window when X is pressed
        setDefaultCloseOperation(EXIT_ON_CLOSE); 
        //Make window visible
        this.setVisible(true);
        //Setups layout managers and frame
        createLayout();
        //Create the list of filters
        createFilterList();
        /*Create the top 7 filter buttons
         * and add to panel.*/
        createFilterButtons();
        /*Create bottom 3 option buttons
         * and add to panel*/
        createOptionButtons(); 
        //disables all but Open
        disableButtons();
        //pack window down to buttons
        this.pack();
        //Set default window size
        myDefaultWindowSize = this.getSize();
        //Ensures window never minimizes past buttons until image is loaded.
        this.setMinimumSize(myDefaultWindowSize);
    }    
}