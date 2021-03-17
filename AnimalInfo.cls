public with sharing class AnimalInfo {
    public List<Animal> animals;

	public class Animal {
		public String name;
		public String eats;
		public String says;
		public Integer extId;
	}

	
	public static AnimalInfo parse(String input) {
		return (AnimalInfo) System.JSON.deserialize(input, AnimalInfo.class);
	}
}

