/*
 * TCSS 305 - Easy Street
 */

package model;

import java.util.ArrayList;
import java.util.Map;

/**
 * 
 * Trucks travel only on streets and through lights and crosswalks.
 * Trucks randomly select to go straight, turn left, or turn right. 
 * As a last resort, if none of these three,
 * directions is legal (all not streets, lights, or crosswalks), the truck turns around.
 * Trucks drive through all traffic lights without stopping!
 * Trucks stop for red crosswalk lights, but drive through yellow or
 * green crosswalk lights without,
 * stopping.
 * Collision behavior: A truck survives a collision with anything, living or dead.
 * @author Jacob Reed
 * @version Apr 14, 2017
 *
 */
public class Truck extends AbstractVehicle {
    /** Death time, Truck has no death. */
    private static final int DEATH_TIME = 0;
    
    /**
     * Constructor.
     * @param theX X coordinate.
     * @param theY Y coordinate.
     * @param theDir Direction.
     */
    public Truck(final int theX, final int theY, 
                 final Direction theDir) {
        super(theX, theY, theDir);
        myDeathTimer = DEATH_TIME;
        myTerrain = new ArrayList<Terrain>();
        myTerrain.add(Terrain.CROSSWALK);
        myTerrain.add(Terrain.STREET);
        myTerrain.add(Terrain.LIGHT);
    }
    
    /**
     * Returns whether or not truck can pass through terrain dependent on light.
     * @param theTerrain Terrain to analyze.
     * @param theLight Whether light is green or red.
     * @return Can vehicle pass. True if so.
     */
    public boolean canPass(final Terrain theTerrain, final Light theLight) {
        boolean result = false;
        if (myTerrain.contains(theTerrain)) {
            if (theTerrain.equals(Terrain.CROSSWALK)
                             && (theLight == Light.RED)) {
                //If at crosswalk and light is red, STOP!
                result = false;
            } else {
                result = true;
            }
        }
        return result;
    }

    @Override
    public Direction chooseDirection(final Map<Direction, Terrain> theNeighbors) {
        Direction resultDir = Direction.random();
        if (canPass(Terrain.STREET, Light.GREEN)) {

            if (truckReverse(theNeighbors)) {
                resultDir = getDirection().reverse();
                
            } else {
                while (theNeighbors.get(resultDir) != Terrain.STREET
                       && theNeighbors.get(resultDir) != Terrain.CROSSWALK
                       && theNeighbors.get(resultDir) != Terrain.LIGHT
                       || resultDir == getDirection().reverse()) {
                    resultDir = Direction.random();
                }
            }
        }

        return resultDir;

    }
    /**
     * Helper method to help truck reverse due to 
     * cyclomatic complexity warnings in chooseDirection.
     * 
     * @param theNeighbors Neighboring Direction,Terrain.
     * @return Whether or not truck can reverse;
     */
    private boolean truckReverse(final Map<Direction, Terrain> theNeighbors) {
        final Direction curDir = getDirection();
        //Checks to make sure it can't go other directions first via terrain.
        return theNeighbors.get(getDirection()) != Terrain.STREET
                        && theNeighbors.get(curDir) != Terrain.LIGHT
                        && theNeighbors.get(curDir.right()) != Terrain.LIGHT
                        && theNeighbors.get(curDir.left()) != Terrain.LIGHT
                        && theNeighbors.get(curDir) != Terrain.CROSSWALK
                        && theNeighbors.get(curDir.right()) != Terrain.CROSSWALK
                        && theNeighbors.get(curDir.left()) != Terrain.CROSSWALK
                        && (theNeighbors.get(curDir.right()) != Terrain.STREET)
                        && (theNeighbors.get(curDir.left()) != Terrain.STREET);
    }

}
