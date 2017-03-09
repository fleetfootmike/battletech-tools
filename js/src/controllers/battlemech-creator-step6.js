var battlemechCreatorControllerStep6Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP6_TITLE', 'BM_STEP6_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP6_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP6_DESC )
					$scope.h3_title = translation.BM_STEP6_TITLE + ": " + translation.BM_STEP6_DESC;
				else
					$scope.h3_title = translation.BM_STEP6_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();

			localStorage["backToPath"] = $location.$$path;

			$scope.selectedItem = null;

			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech.calc();
			}

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			updateMechStatusBarAndTRO($scope, $translate);

			update_step_6_items($scope, $scope.current_mech);

			$translate(
				[
					'TRO_ARMOR_HD', 'TRO_ARMOR_CT', 'TRO_ARMOR_RT', 'TRO_ARMOR_LT',
					'TRO_ARMOR_RA', 'TRO_ARMOR_LA', 'TRO_ARMOR_RL', 'TRO_ARMOR_LL',
					'TRO_ARMOR_RFL', 'TRO_ARMOR_LFL', 'TRO_ARMOR_RRL', 'TRO_ARMOR_LRL'
				]
			).then(function (translation) {

				$scope.label_head = translation.TRO_ARMOR_HD;
				$scope.label_center_torso = translation.TRO_ARMOR_CT;
				$scope.label_right_torso = translation.TRO_ARMOR_RT;
				$scope.label_left_torso = translation.TRO_ARMOR_LT;

				if( $scope.current_mech.getMechType().class.toLowerCase() == "quad") {
					$scope.battlemech_is_quad = true;
					$scope.label_right_arm = translation.TRO_ARMOR_RFL;
					$scope.label_left_arm = translation.TRO_ARMOR_LFL;
					$scope.label_right_leg = translation.TRO_ARMOR_RRL;
					$scope.label_left_leg = translation.TRO_ARMOR_LRL;
				} else {
					$scope.battlemech_is_quad = false;
					$scope.label_right_arm = translation.TRO_ARMOR_RA;
					$scope.label_left_arm = translation.TRO_ARMOR_LA;
					$scope.label_right_leg = translation.TRO_ARMOR_RL;
					$scope.label_left_leg = translation.TRO_ARMOR_LL;
				}

			});


			$scope.step6ItemClick = function( criticalItem, indexLocation, locationString ) {
				if( typeof(criticalItem) == "undefined")
					criticalItem = null;
				if( typeof(indexLocation) == "undefined")
					indexLocation = null;
				if( typeof(locationString) == "undefined")
					locationString = null;

				$scope.errorCannotPlace = false;
				$scope.errorCannotMove = false;
				$scope.torsosAndHeadOnly = false;
				$scope.legsAndTorsosOnly = false;

				//~ console.log( "step6ItemClick", criticalItem, indexLocation, locationString );
				if( $scope.selectedItem == null ) {
					if( criticalItem != null) {
						if( criticalItem.movable == true ) {
							 $scope.selectedItem = {
								 item: criticalItem,
								 from: locationString,
								 index: indexLocation
							};
						} else {
							//~ console.log( "Unmovable item selected" );
							$scope.errorCannotMove = true;
						}
					} else {
						//~ console.log( "Unallocated area selected" );


					}
				} else {
					if( $scope.selectedItem.item == criticalItem ) {
						$scope.selectedItem = null;
					} else if( criticalItem ) {
						//~ console.log( "Slot is already filled" );
						$scope.errorCannotPlace = true;
					} else {


						if(
							(
								(
									$scope.selectedItem.item.obj
										&&
									$scope.selectedItem.item.obj.rear
								)
									||
								$scope.selectedItem.item.rear
							)
								&&
							(
								locationString == "ra"
									||
								locationString == "la"
									||
								locationString == "rl"
									||
								locationString == "ll"
							)
						) {
							$scope.torsosAndHeadOnly = true;
						} else if(
							$scope.selectedItem.item.tag.indexOf("jj-") === 0
								&&
							(
								locationString == "ra"
									||
								locationString == "la"
									||
								locationString == "hd"
							)
						) {
							$scope.legsAndTorsosOnly = true;
						} else {

							var itemTag =  $scope.selectedItem.item.tag;
							if( $scope.selectedItem.item && $scope.selectedItem.item.obj && $scope.selectedItem.item.obj.rear )
								var itemRear =  $scope.selectedItem.item.obj.rear;
							else
								var itemRear = false;
							var fromLocation =  $scope.selectedItem.from;
							var fromIndex =  $scope.selectedItem.index;
							var toLocation = locationString;
							var toIndex = indexLocation;
							worked = $scope.current_mech.moveCritical(
								itemTag,
								itemRear,
								fromLocation,
								fromIndex,
								toLocation,
								toIndex
							);

							if( worked ) {
								//~ console.log( "a", $scope.current_mech.criticals.leftTorso )
								$scope.current_mech.updateCriticalAllocationTable();
								//~ console.log("b", $scope.current_mech.criticals.leftTorso )
								$scope.current_mech.calc();
								//~ console.log("c", $scope.current_mech.criticals.leftTorso )
								localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

								update_step_6_items($scope, $scope.current_mech);
								updateMechStatusBarAndTRO($scope, $translate);

								$scope.selectedItem = null;
							} else {
								$scope.errorCannotPlace = true;
							}
						}
					}

				}
			}


			// make tro for sidebar
			$scope.clickLowerRightArmActuator = function() {
				if( $scope.has_ra_lower_arm_actuator )
					$scope.current_mech.addLowerArmActuator("ra");
				else
					$scope.current_mech.removeLowerArmActuator("ra");

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				update_step_6_items($scope, $scope.current_mech);
				updateMechStatusBarAndTRO($scope, $translate);

			}
			$scope.clickLowerLeftArmActuator = function() {
				if( $scope.has_la_lower_arm_actuator )
					$scope.current_mech.addLowerArmActuator("la");
				else
					$scope.current_mech.removeLowerArmActuator("la");

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				update_step_6_items($scope, $scope.current_mech);
				updateMechStatusBarAndTRO($scope, $translate);

			}
			$scope.clickRightHandActuator = function() {

				if( $scope.has_ra_hand_actuator )
					$scope.current_mech.addHandActuator("ra");
				else
					$scope.current_mech.removeHandActuator("ra");

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				update_step_6_items($scope, $scope.current_mech);
				updateMechStatusBarAndTRO($scope, $translate);

			}
			$scope.clickLeftHandActuator = function() {
				if( $scope.has_la_hand_actuator )
					$scope.current_mech.addHandActuator("la");
				else
					$scope.current_mech.removeHandActuator("la");

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				update_step_6_items($scope, $scope.current_mech);
				updateMechStatusBarAndTRO($scope, $translate);
			}

			$scope.resetAllocations = function() {
				$scope.selectedItem = null;
				$scope.current_mech.clearCriticalAllocationTable();
				$scope.current_mech.calc();
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				update_step_6_items($scope);
				updateMechStatusBarAndTRO($scope, $translate);
			}

		}
	]
;

function update_step_6_items($scope) {

	$scope.has_la_hand_actuator = $scope.current_mech.hasHandActuator("la");
	$scope.has_ra_hand_actuator = $scope.current_mech.hasHandActuator("ra");
	$scope.has_la_lower_arm_actuator = $scope.current_mech.hasLowerArmActuator("la");
	$scope.has_ra_lower_arm_actuator = $scope.current_mech.hasLowerArmActuator("ra");

//~ console.log($scope.current_mech.criticals.head );
	$scope.current_mech.trimCriticals();

	var criticals = $scope.current_mech.getCriticals();

	$scope.battlemech_head = criticals.head;

	$scope.battlemech_left_arm = criticals.leftArm;

	$scope.battlemech_right_arm = criticals.rightArm;

	$scope.battlemech_left_leg = criticals.leftLeg;

	$scope.battlemech_right_leg = criticals.rightLeg;

	$scope.battlemech_left_torso = criticals.leftTorso;

	$scope.battlemech_center_torso = criticals.centerTorso;

	$scope.battlemech_right_torso = criticals.rightTorso;

	$scope.battlemech_unallocated_items = $scope.current_mech.getUnallocatedCriticals();
	//~ console.log( $scope.battlemech_head );
}

angular.module("webApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);


